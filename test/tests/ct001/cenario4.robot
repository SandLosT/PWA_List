*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Finalizar cadastro com sucesso
    Acessar a página de cadastro
    Preencher com um e-mail válido
    Clicar em avançar (email)
    Preencher com um nome válido
    Clicar em avançar (nome)
    Preencher com uma senha válida
    Clicar em avançar (senha)
    Preencher com um nome de usuário válido
    Clicar em avançar (nome de usuário)
    Aceitar os termos
    Clicar em cadastrar
    Deve exibir mensagem de sucesso

*** Keywords ***
Acessar a página de cadastro
    Open Browser    ${CADASTRAR_URL}    chrome
    Maximize Browser Window

Preencher com um e-mail válido
    Wait Until Element Is Visible    id=email    timeout=10s
    Input Text    id=email    ct004_cenario1@teste.com
    
Preencher com um nome válido
    Wait Until Element Is Visible    id=nome    timeout=10s
    Input Text    id=nome    CT004 - Cenário 1

Preencher com uma senha válida
    Wait Until Element Is Visible    id=senha    timeout=10s
    Input Text    id=senha    senha123
    Input Text    id=confirmarSenha    senha123
    
Preencher com um nome de usuário válido
    Wait Until Element Is Visible    id=username    timeout=10s
    Input Text    id=username    ct004_cenario1

Aceitar os termos
    Wait Until Element Is Visible    xpath=//div[@class = "checklist"]//input[@type = "checkbox"]    timeout=10s
    Click Element    xpath=(//div[@class = "checklist"]//input[@type = "checkbox"])[1]
    Click Element    xpath=(//div[@class = "checklist"]//input[@type = "checkbox"])[2]

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

Clicar em cadastrar
    Wait Until Element Is Visible    xpath=//form[@id = "formTermos"]//button[@type = "submit"]    timeout=10s
    Click Button    xpath=//form[@id = "formTermos"]//button[@type = "submit"]

Deve exibir mensagem de sucesso
    Wait Until Element Contains    id=swal2-html-container    Cadastro concluído com sucesso!