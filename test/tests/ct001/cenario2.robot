*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Preencher com senha inválida
    Acessar a página de cadastro
    Preencher com um e-mail válido
    Clicar em avançar (email)
    Preencher com um nome válido
    Clicar em avançar (nome)
    Preencher com uma senha inválida
    Clicar em avançar (senha)
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

Preencher com uma senha inválida
    Wait Until Element Is Visible    id=senha    timeout=10s
    Input Text    id=senha    senha

Clicar em avançar (email)
    Wait Until Element Is Visible    xpath=//form[@id = "formEmail"]//button[@type = "submit"]    timeout=10s
    Click Button    xpath=//form[@id = "formEmail"]//button[@type = "submit"]

Clicar em avançar (nome)
    Wait Until Element Is Visible    xpath=//form[@id = "formNome"]//button[@type = "submit"]    timeout=10s
    Click Button    xpath=//form[@id = "formNome"]//button[@type = "submit"]
    
Clicar em avançar (senha)
    Wait Until Element Is Visible    xpath=//form[@id = "formSenha"]//button[@type = "submit"]    timeout=10s
    Click Button    xpath=//form[@id = "formSenha"]//button[@type = "submit"]

Deve exibir mensagem de erro
    Page Should Contain Element    xpath=//form[@id = "formSenha"]//*[@class = "invalid-feedback"]