*** Settings ***
Library    SeleniumLibrary
Library    Collections
Library    XML
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Visualizar listas em ordem alfabética
    Abrir a página de login
    Inserir as credenciais válidas
    Deve exibir as listas em ordem alfabética

*** Keywords ***
Abrir a página de login
    Open Browser    ${LOGIN_URL}    chrome
    Maximize Browser Window

Inserir as credenciais válidas
    Input Text    id=email    ${EMAIL}
    Input Password    id=senha    ${SENHA}
    Click Button    xpath=//button[@type = "submit"]

Deve exibir as listas em ordem alfabética
    Wait Until Location Contains    ${MINHAS_LISTAS_URL}
    Wait Until Element Is Visible    css=.etiqueta--lista    timeout=10s
    ${elements}    Get WebElements    xpath=//*[@class = "etiqueta__titulo"]
    ${listas}    Create List
    FOR    ${element}    IN    @{elements}
        ${titulo}    Get Text    ${element}
        Log To Console    ${titulo}
        Append To List    ${listas}    ${titulo}
    END
    ${listas_ordenado}    Copy List    ${listas}
    Sort List    ${listas_ordenado}
    Should Be Equal    ${listas_ordenado}    ${listas}