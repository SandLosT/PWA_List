*** Settings ***
Library    SeleniumLibrary
Library    Collections
Resource    ../../variables/global_variables.robot

*** Test Cases ***
Cenário 1: Visualizar itens em ordem alfabética
    Abrir a página de login
    Inserir as credenciais válidas
    Clicar no nome de uma lista
    Deve exibir os itens em ordem alfabética

*** Keywords ***
Abrir a página de login
    Open Browser    ${LOGIN_URL}    chrome
    Maximize Browser Window

Inserir as credenciais válidas
    Input Text    id=email    ${EMAIL}
    Input Password    id=senha    ${SENHA}
    Click Button    xpath=//button[@type = "submit"]

Clicar no nome de uma lista
    Wait Until Element Is Visible    xpath=(//*[@class = "etiqueta__titulo"])[1]    timeout=10s
    Click Element    xpath=(//*[@class = "etiqueta__titulo"])[1]

Deve exibir os itens em ordem alfabética
    Sleep    2s
    Wait Until Element Is Visible    css=.etiqueta__titulo    timeout=10s
    ${elements}    Get WebElements    xpath=//*[@class = "etiqueta__titulo"]
    ${itens}    Create List
    FOR    ${element}    IN    @{elements}
        ${nome}    Get Text    ${element}
        Log To Console    ${nome}
        Append To List    ${itens}    ${nome}
    END
    ${itens_ordenado}    Copy List    ${itens}
    Sort List    ${itens_ordenado}
    Should Be Equal    ${itens_ordenado}    ${itens}