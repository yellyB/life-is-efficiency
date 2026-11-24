import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const TIME_ZONE = 'Asia/Seoul';

function git(args) {
	return execFileSync('git', args, { encoding: 'utf8', env: { ...process.env, TZ: TIME_ZONE } });
}

function hasDate(source) {
	const frontmatter = source.match(FRONTMATTER);
	return !!frontmatter && /^date:\s*\S/m.test(frontmatter[1]);
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

function withDate(source, date) {
	const line = `date: '${date}'`;
	if (FRONTMATTER.test(source)) return source.replace(/^---\r?\n/, `---\n${line}\n`);
	return `---\n${line}\n---\n\n${source}`;
}

function check(files) {
	const missing = files.filter((file) => !hasDate(git(['show', `:${file}`])));
	if (missing.length === 0) return;

	console.warn('경고: frontmatter에 date가 누락된 문서');
	for (const file of missing) console.warn(`- ${file}`);
}

function fix(files) {
	for (const file of files) {
		const source = readFileSync(file, 'utf8');
		if (hasDate(source)) continue;

		const date = firstCommitDate(file);
		writeFileSync(file, withDate(source, date));
		console.log(`${file}: ${date}`);
	}
}

const [mode, ...files] = process.argv.slice(2);
const posts = files.filter((file) => file.startsWith('content/') && file.endsWith('.md'));

if (mode === 'check') check(posts);
else if (mode === 'fix') fix(posts);
else {
	console.error('usage: node scripts/post-dates.mjs <check|fix> [files...]');
	process.exit(1);
}
