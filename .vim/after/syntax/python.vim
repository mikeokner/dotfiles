unlet b:current_syntax
syntax include @SQL syntax/sql.vim
syntax region sqlSnip matchgroup=Snip start="--BEGIN SQL" end="--END SQL" contains=@SQL
hi link Snip SpecialComment

unlet b:current_syntax
syntax include @HTML syntax/html.vim
syntax region xmlSnip matchgroup=ht start="<!--BEGIN-->" end="<!--END-->" contains=@HTML
hi link ht SpecialComment
