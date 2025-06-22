*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Preencher com nome de usuário que já existe
    Acessar a página de cadastro
    Preencher com um e-mail válido
    Clicar em avançar (email)
    Preencher com um nome válido
    Clicar em avançar (nome)
    Preencher com uma senha válida
    Clicar em avançar (senha)
    Preencher com um nome de usuário que já existe
    Clicar em avançar (nome de usuário)
    Deve exibir mensagem de erro

*** Keywords ***
Acessar a página de cadastro
    Open Browser    ${CADASTRAR_URL}    chrome
    Maximize Browser Window

Preencher com um e-mail válido
    Wait Until Element Is Visible    id=email    timeout=10s
    Input Text    id=email    email-que-nao-existe@gmail.com
    
Preencher com um nome válido
    Wait Until Element Is Visible    id=nome    timeout=10s
    Input Text    id=nome    Douglas

Preencher com uma senha válida
    Wait Until Element Is Visible    id=senha    timeout=10s
    Input Text    id=senha    senha123
    Input Text    id=confirmarSenha    senha123
    
Preencher com um nome de usuário que já existe
    Wait Until Element Is Visible    id=username    timeout=10s
    Input Text    id=username    douglaslima

Clicar em avançar (email)
    Wait Until Element Is Visible    xpath=//form[@id = "formEmail"]//button[@type = "submit"]    timeout=10s
    Click Button    xpath=//form[@id = "formEmail"]//button[@type = "submit"]

Clicar em avançar (nome)
    Wait Until Element Is Visible    xpath=//form[@id = "formNome"]//button[@type = "submit"]    timeout=10s
    Click Button    xpath=//form[@id = "formNome"]//button[@type = "submit"]
    
Clicar em avançar (senha)
    Wait Until Element Is Visible    xpath=//form[@id = "formSenha"]//button[@type = "submit"]    timeout=10s
    Click Button    xpath=//form[@id = "formSenha"]//button[@type = "submit"]
    
Clicar em avançar (nome de usuário)
    Wait Until Element Is Visible    xpath=//form[@id = "formUsername"]//button[@type = "submit"]    timeout=10s
    Click Button    xpath=//form[@id = "formUsername"]//button[@type = "submit"]

Deve exibir mensagem de erro
    Wait Until Element Contains    id=swal2-html-container    Esse nome de usuário já possui cadastro!