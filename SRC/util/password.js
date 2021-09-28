const securePassword = require('secure-password');

const pwd = securePassword();

async function criarHash(senha) {
    const HashSenha = (await pwd.hash(Buffer.from(senha))).toString('hex');
    return HashSenha;
}

async function verificarHash(senha, hash) {
    const result = await pwd.verify(Buffer.from(senha), Buffer.from(hash, 'hex'))

    switch (result) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
        return {status: false, message:'Senha/Email Invalido'}
      case securePassword.INVALID:
        return {status: false, message:'Senha/Email Invalido'}
      case securePassword.VALID:
        return {status: true, message:'Autenticado'}
      case securePassword.VALID_NEEDS_REHASH: 
        return {status: true, message: 'Autenticado', atualizarHash: true}
    }
}

module.exports = {
    verificarHash,
    criarHash
}