/// <reference types= "cypress" />

import { faker } from '@faker-js/faker'
import commumPage from '../support/pages/commumPage'
import cadastroPage from '../support/pages/cadastroUsuarioPage'

describe('Cadastro de usuario', ()=>{

    beforeEach('Acessar cadastro de usuário', ()=>{
        commumPage.acessarCadastroUsuario()
        
    })

    it('Campo nome vazio', ()=> {
        cadastroPage.clicarCadastrar()
        cadastroPage.validarMensagemErro('O campo nome deve ser prenchido')
    })


    it('Campo email vazio', ()=> {
        cadastroPage.preencheNome(faker.person.fullName())
        cadastroPage.clicarCadastrar()
        cadastroPage.validarMensagemErro('O campo e-mail deve ser prenchido corretamente')

    })

    it('Campo email inválido', ()=> {
        cadastroPage.preencheNome(faker.person.fullName())
        cadastroPage.preencheEmail(faker.person.firstName())
        cadastroPage.clicarCadastrar()
        cadastroPage.validarMensagemErro('O campo e-mail deve ser prenchido corretamente')

    })

    it('Campo senha vazio', ()=> {
        cadastroPage.preencheNome(faker.person.fullName())
        cadastroPage.preencheEmail(faker.internet.email())
        cadastroPage.clicarCadastrar()
        cadastroPage.validarMensagemErro('O campo senha deve ter pelo menos 6 dígitos')

    })

    it('Campo senha inválido ', ()=> {
        cadastroPage.preencheNome(faker.person.fullName())
        cadastroPage.preencheEmail(faker.internet.email())
        cadastroPage.preencheSenha('123')
        cadastroPage.clicarCadastrar()
        cadastroPage.validarMensagemErro('O campo senha deve ter pelo menos 6 dígitos')
    })

    it('Cadastro com sucesso', async ()=> {

        const name = await faker.person.fullName()

        cadastroPage.preencheNome(name)
        cadastroPage.preencheEmail(faker.internet.email())
        cadastroPage.preencheSenha(faker.internet.password())
        cadastroPage.clicarCadastrar()
        cadastroPage.validarMensagemSucesso(name)

    })

})