---
title: "개발자를 위한 Neovim 가이드 - 2. 추천 플러그인"
created: '2025-08-06'
---

-   [시작하기 전에](#시작하기-전에)
-   [NERDTree: 파일 탐색기](#NERDTree:-파일-탐색기)
-   [fzf.vim: 빠른 검색](#fzf.vim:-빠른-검색)
-   [LSP 관련 플러그인](#lsp-관련-플러그인)
-   [Git 관련 플러그인](#git-관련-플러그인)
    -   [vim-fugitive](#vim-fugitive)
    -   [gitsigns.nvim](#gitsigns.nvim)
-   [테마 관련 플러그인](#테마-관련-플러그인)
    -   [folke/tokyonight.nvim](#folke/tokyonight.nvim)
-   [마지막으로](#마지막으로)

* * *

## **시작하기 전에**

모든 플러그인은 1편 글에서 소개한 것처럼 **vim-plug**를 사용한다면 아래 단계로 설치 가능하다.

**`1. .vimrc`의 플러그인 목록에 다음 코드 추가**

```bash
Plug '플러그인명'
```

\* 플러그인명은 github.com/ 뒤에 붙은 부분을 넣어준다. (ex. [https://github.com/preservim/nerdtree](https://github.com/preservim/nerdtree) → 플러그인 명: preservim/nerdtree)

**2\. 저장&종료 후 파일 다시 열어서 `:PlugInstall`로 설치**

* * *

## **NERDTree: 파일 탐색기**

[GitHub - preservim/nerdtree: A tree explorer plugin for vim.](https://github.com/preservim/nerdtree)

Vim에는 기본적인 파일 탐색 기능이 없다.
그래서 많은 사람들이 사용하는 플러그인이 **NERDTree**다.
파일과 폴더를 트리 형태로 보여주며 탐색할 수 있다.

**설치**

```bash
Plug 'preservim/nerdtree'
```

**사용법**

-   `:NERDTree` → 탐색기 열기
-   `:NERDTreeToggle` → 탐색기 토글
-   `t` → 새 탭으로 열기

**Tip**

**NERDTree**는 기본적으로 키를 매핑하지 않기 때문에 수동으로 단축키를 지정해주어야 한다.

```bash
nnoremap <leader>n :NERDTreeToggle<CR>
```

위 코드를 `.vimrc`에 추가해 주면 **`기본 리더키(\)` + `n`**으로 파일 트리를 열 수 있다.

* * *

## **fzf.vim: 빠른 검색**

[GitHub - junegunn/fzf.vim: fzf vim](https://github.com/junegunn/fzf.vim)
fzf는 fuzzy finder(퍼지 검색)로, 이름의 일부만 입력해도 관련 파일을 찾아준다.
**fzf.vim**은 이를 Vim에서 편하게 사용할 수 있도록 해준다.

**설치**

```bash
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
```

**fzf.vim**은 fzf CLI도구가 설치되어 있어야 동작하기 때문에 fzf이 없으면 설치하도록 하였다.

**사용법**

-   `:Files` → 파일 검색
-   `:Buffers` → 열린 버퍼 검색
-   `:Lines`,
-   `:BLines` → 줄 단위 검색

* * *

## **LSP 관련 플러그인**

코드 자동완성, 오류 표시, Go to Definition 등 개발에 필요한 기능을 LSP 플러그인으로 구현할 수 있다.

```bash
Plug 'neovim/nvim-lspconfig'       " LSP 클라이언트 설정 플러그인
Plug 'hrsh7th/nvim-cmp'            " 자동완성 플러그인
Plug 'hrsh7th/cmp-nvim-lsp'        " LSP 소스 연결
Plug 'hrsh7th/cmp-buffer'          " 버퍼 소스
Plug 'hrsh7th/cmp-path'            " 파일 경로 완성
Plug 'hrsh7th/cmp-vsnip'           " Snippet 지원
Plug 'hrsh7th/vim-vsnip'           " Snippet 엔진
```

\[간단한 설정 예시\]

```bash
lua << EOF
local cmp = require'cmp'
cmp.setup({
  snippet = {
    expand = function(args)
      vim.fn["vsnip#anonymous"](args.body)
    end,
  },
  sources = {
    { name = 'nvim_lsp' },
    { name = 'buffer' },
    { name = 'path' },
  }
})
require('lspconfig').pyright.setup{}
EOF
```

\* 언어에 따라 pyright, tsserver 등 서버 설정이 달라진다. 자세한 내용은 공식 문서 참고.

* * *

## **Git 관련 플러그인**

간단한 Git 상태 확인이나 blame 정보만 필요하다면 우선 아래 플러그인들을 사용하면 되고, 더 필요한 기능이 있다면 조금씩 커스터마이징 해나가자.

### **vim-fugitive**

[GitHub - tpope/vim-fugitive: fugitive.vim: A Git wrapper so awesome, it should be illegal](https://github.com/tpope/vim-fugitive)

Git 명령어 전체를 Vim 안에서 실행할 수 있게 해주는 Git 클라이언트

```bash
Plug 'tpope/vim-fugitive'
```

**사용법**

-   `:Git` → git 명령어 실행
-   `:Gstatus` → git status
-   `:Gblame` → blame 보기

### **gitsigns.nvim**

[GitHub - lewis6991/gitsigns.nvim: Git integration for buffers](https://github.com/lewis6991/gitsigns.nvim)

라인 옆에 변경사항을 변경된 줄에 +, ~, - 기호로 보여주는 플러그인이다.

```bash
Plug 'lewis6991/gitsigns.nvim'
```

* * *

## **테마 관련 플러그인**

테마는 개인 취향이기 때문에 원하는 테마를 서치해서 적용하면 된다.
우선은 가장 깃허브 스타 수, 사용량이 많고 완성도 높은 편인 테마 하나를 추천한다.

### folke/tokyonight.nvim

[GitHub - folke/tokyonight.nvim: 🏙 A clean, dark Neovim theme written in Lua, with support for lsp, treesitter and lots of plugins. Includes additional themes for Kitty, Alacritty, iTerm and Fish.](https://github.com/folke/tokyonight.nvim)

```bash
Plug 'folke/tokyonight.nvim'
```

* * *

## **마지막으로**

이외에도 아주 많은 플러그인이 있지만, 개발을 시작할 때 필수라고 생각되는 기본적인 플러그인 몇 가지만 작성해 보았다.
앞으로 vim을 사용하면서 설정을 조금씩 커스터마이징해 나가면 된다.
