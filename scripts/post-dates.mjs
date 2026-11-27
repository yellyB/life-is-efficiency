import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname } from 'node:path';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const TIME_ZONE = 'Asia/Seoul';

function git(args) {
	return execFileSync('git', args, { encoding: 'utf8', env: { ...process.env, TZ: TIME_ZONE } });
}

function hasCreated(source) {
	const frontmatter = source.match(FRONTMATTER);
	return !!frontmatter && /^created:\s*\S/m.test(frontmatter[1]);
}

function postTitle(file, source) {
	const frontmatter = source.match(FRONTMATTER);
	const title = frontmatter?.[1].match(/^title:[ \t]*(.+?)[ \t]*$/m)?.[1].replace(/^(['"])(.*)\1$/, '$2');
	if (title) return title;
	return basename(file) === 'index.md' ? basename(dirname(file)) : basename(file, '.md');
}

function today() {
	return new Date().toLocaleDateString('sv-SE', { timeZone: TIME_ZONE });
}

function firstCommitDate(file) {
	const dates = git(['log', '--follow', '--format=%ad', '--date=format-local:%Y-%m-%d', '--', file])
		.split('\n')
		.filter(Boolean);
	return dates.at(-1) ?? today();
}

function lastCommitDate(file) {
	return git(['log', '-1', '--format=%ad', '--date=format-local:%Y-%m-%d', '--', file]).trim() || today();
}

function withField(source, key, value) {
	const line = `${key}: '${value}'`;
	const frontmatter = source.match(FRONTMATTER);
	if (!frontmatter) return `---\n${line}\n---\n\n${source}`;

	const [whole, inner] = frontmatter;
	const pattern = new RegExp(`^${key}:.*$`, 'm');
	const nextInner = pattern.test(inner) ? inner.replace(pattern, () => line) : inner ? `${inner}\n${line}` : line;
	return whole.replace(inner, () => nextInner) + source.slice(whole.length);
}

function withCreated(source, date) {
	const line = `created: '${date}'`;
	if (FRONTMATTER.test(source)) return source.replace(/^---\r?\n/, `---\n${line}\n`);
	return `---\n${line}\n---\n\n${source}`;
}

function check(files) {
	const missing = files.filter((file) => !hasCreated(git(['show', `:${file}`])));
	if (missing.length === 0) return;

	console.warn('경고: frontmatter에 created가 누락된 문서');
	for (const file of missing) console.warn(`- ${file}`);
}

function fix(files) {
	for (const file of files) {
		const source = readFileSync(file, 'utf8');
		if (hasCreated(source)) continue;

		const date = firstCommitDate(file);
		writeFileSync(file, withCreated(source, date));
		console.log(postTitle(file, source));
	}
}

function body(source) {
	return source.replace(FRONTMATTER, '');
}

function bodyAt(ref, file) {
	try {
		return body(git(['show', `${ref}:${file}`]));
	} catch {
		return null;
	}
}

function touch(base, files) {
	for (const file of files) {
		const source = readFileSync(file, 'utf8');
		if (bodyAt(base, file) === body(source)) continue;

		const date = lastCommitDate(file);
		const next = withField(source, 'updated', date);
		if (next === source) continue;

		writeFileSync(file, next);
		console.log(postTitle(file, source));
	}
}

const [mode, ...args] = process.argv.slice(2);
const base = mode === 'touch' ? args.shift() : undefined;
const posts = args.filter((file) => file.startsWith('content/') && file.endsWith('.md'));

if (mode === 'check') check(posts);
else if (mode === 'fix') fix(posts);
else if (mode === 'touch' && base) touch(base, posts);
else {
	console.error('usage: node scripts/post-dates.mjs <check|fix|touch <base>> [files...]');
	process.exit(1);
}
