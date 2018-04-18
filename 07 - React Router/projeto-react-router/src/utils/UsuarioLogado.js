
let usuarioLogado = false;

export default {

    logar() {
        usuarioLogado = true;
    },

    deslogar() {
        usuarioLogado = false;
    },

    estaLogado() {
        return usuarioLogado;
    }

}
