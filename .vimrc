set nocompatible        " Disables vi compatibility for expanded features
autocmd!
" -----------------------------------------------------------------------
"  Those must be top two lines.

" set autoread          " Auto reloads a file when modified elsewhere
execute pathogen#infect()
set showcmd             " Shows what you are typing as command near ruler
set history=1000        " Command history
set ruler               " Keeps the line/col counter always on
set noeb vb t_vb=       " Disable bells
" set linebreak         " Wrap lines at convenient places
set scrolloff=4         " Keep at least n lines around the cursor
set bs=2                " Enable backspace to delete previous chars
set number              " Enable line numbering
" set cursorline        " Highlight current line  
set cmdheight=1         " Puts the : line n lines from the bottom (1 is default)
set hlsearch            " Highlights search results  
" set incsearch         " Highlights as you type (kind of annoying as it jumps around)
set showmatch           " Highlight matching delimiters  
set tabstop=4           " Number of spaces in tabs 
set softtabstop=4 
set shiftwidth=4 
set autoindent          " Auto indents to same level as previous line
set expandtab           " Expand tabs to spaces
set smarttab			" Indent based on syntax (Use :set paste to temporarily disable)
"set textwidth=79
" filetype indent on	" Annoying.
set t_Co=256            " Set 256 colors
set wildmode=longest,list,full  " Tab completion more like bash
set wildmenu
" Note that if background colors  or other colors look weird, it's probably
" because your terminal settings are off. Look into the `$TERM` variable in bash.
filetype on             " Filetype recognition
filetype plugin on  
syntax on               " Color highlighting
colorscheme peachpuff   " delek, torte, peachpuff are all good

" Add closing brackets and parens automatically
"autocmd FileType c,javascript,java,css inoremap { {<CR>}<Esc>ko<Tab>
"inoremap [ []<Esc>i
"inoremap ( ()<Esc>i

" Highlight lines that are longer than 120.
"highlight OverLength ctermbg=red ctermfg=white guibg=#592929
"match OverLength /\%120v.\+/
" Contrasting color for column 80 and 120+
highlight ColorColumn ctermbg=236 guibg=#2c2d2a
let &colorcolumn="80,".join(range(120,999), ",")

" Trim white space when saving files
autocmd BufWritePre *.py normal m`:%s/\s\+$//`

" FOLDING
set foldnestmax=2       " Fold two levels of indenting (classes and methods)
" Automatically set folds based on indentation
autocmd BufEnter *.py setlocal fdm=indent
" Set all folds open when opening new file
autocmd BufEnter *.py normal zR

" Read syntax from beginning of file for more accurate colors
autocmd BufEnter * :syntax sync fromstart

" For crontab editing on Mac OS X:
if $VIM_CRONTAB == "true"
set nobackup
set nowritebackup
endif

" KEYBOARD MAPPINGS
" nmap is when you're in command mode
" imap is insert mode.
" Space removes search highlighting
nmap <SPACE> :noh<CR>

" Syntastic setup  (https://github.com/scrooloose/syntastic)
" pyflakes.vim is preferrable because it runs on mode-change, not just save
" let g:syntastic_python_checkers=['']
let g:syntastic_aggregate_errors = 1
let g:syntastic_quiet_messages = {'type': 'style'}
