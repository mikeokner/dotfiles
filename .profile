# LS Color in Mac OS X
export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad

# Brew
export PATH="/usr/local/bin:/usr/local/sbin:$PATH"
# Nix
#. $HOME/.nix-profile/etc/profile.d/nix.sh

# Set Vim as default editor
export EDITOR=vim

# Don't remember ssh key passwords
unset SSH_AUTH_SOCK

# Aliases
alias vi='vim'
alias psa='ps aux | grep'
alias less='less -RFX'  # Color
alias crontab='VIM_CRONTAB=true crontab'
alias updatedb='sudo /usr/libexec/locate.updatedb'
alias ls='ls -AG'
alias cat='pygmentize -g'
#alias git=hub
alias ssh='assh wrapper ssh'
alias weather='curl http://wttr.in/Chesterfield,%20MO'

# Init nvm
export NVM_DIR="$HOME/.nvm"
. $NVM_DIR/nvm.sh
nvm use v10

# RVM
export PATH="$PATH:$HOME/.rvm/bin"
. $HOME/.rvm/scripts/rvm
rvm use 2.2.3

# Rust
export PATH="$HOME/.cargo/bin:$PATH"

# Golang
export GOPATH="$HOME/Documents/Code/Go"
export PATH="$GOPATH/bin:$PATH"

# Java
export JAVA_VERSION='1.8'
export JAVA_HOME="$(/usr/libexec/java_home $JAVA_VERSION)"
export SCALA_HOME="/usr/local/Cellar/scala/2.12.4/libexec"
export MAVEN_OPTS="-Xmx1024M -XX:MaxPermSize=512m"
export M2_HOME="/usr/local/Cellar/maven/3.3.9/libexec"

# Add aws completion
. /usr/local/share/zsh/site-functions/_aws

# Ansible
export ANSIBLE_NOCOWS=1

# Use this to simulate an interactive shell on an EC2 using SSM
ssm() {
    INSTANCE=$1
    shift
    COMMAND="$@"
    CMD_ID=$(aws ssm send-command --instance-ids $INSTANCE --document-name AWS-RunShellScript --parameters commands="$COMMAND" | jq -r .Command.CommandId)
    sleep 1
    aws ssm list-command-invocations --command-id $CMD_ID --details | jq -r .CommandInvocations[0].CommandPlugins[0].Output
}
