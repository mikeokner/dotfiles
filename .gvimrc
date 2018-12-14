colorscheme desert
set showtabline=2
execute pathogen#infect()

" Override the colorcolumn again
highlight ColorColumn ctermbg=236 guibg=#3C3C3D
let &colorcolumn="80,".join(range(120,999), ",")
