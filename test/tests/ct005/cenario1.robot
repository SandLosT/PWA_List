*** Settings ***
Library    SeleniumLibrary
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Inserir credenciais válidas
    Abrir a página de login
    Inserir as credenciais válidas
    Deve exibir a página "Minhas listas"

*** Keywords ***
Abrir a página de login
    Open Browser    ${LOGIN_URL}    chrome
    Maximize Browser Window

Inserir as credenciais válidas
    Input Text    id=email    ${EMAIL}
    Input Password    id=senha    ${SENHA}
    Click Button    xpath=//button[@type = "submit"]

Deve exibir a página "Minhas listas"
    Wait Until Location Contains    ${MINHAS_LISTAS_URL}