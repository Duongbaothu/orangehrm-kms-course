@E01 @SEL-E01S06
Feature: As a guest, I can select a language appear on my page

    Background: Open browser and navigate to main page
        Given A user visits 'https://phptravels.net/lang-en'
        Then Page title is 'PHPTRAVELS | Travel Technology Partner - PHP'

    Scenario: Verify the default lanague at Home Page
        Then Verify the language as 'ENGLISH' displays on Home Page
        And Verify the copyright is translated correct as 'All Rights Reserved by All Rights Reserved by PHP'

    Scenario Outline: Verify a selected language as <language> at Home Page for normall languages
        When User select the new language as '<language>'
        Then Verify the language as '<language>' displays on Home Page
        And Verify the copyright is translated correct as '<copyRight>'
        Examples:
            | language   | copyRight                                                           |
            | indonesia  | Semua Hak Dilindungi oleh All Rights Reserved by PHP                |
            | Turkish    | Tüm Hakları Saklıdır All Rights Reserved by PHP                     |
            | Russian    | Все права защищены All Rights Reserved by PHP                       |
            | philippine | Lahat ng Mga Karapatan ay Nakareserba ng All Rights Reserved by PHP |
            | Korean     | All Rights Reserved by All Rights Reserved by PHP                   |
            | French     | Tous droits réservés par All Rights Reserved by PHP                 |
            | Spanish    | Todos los derechos reservados por All Rights Reserved by PHP        |
            | German     | Alle rechten voorbehouden door All Rights Reserved by PHP           |
            | Português  | Todos os direitos reservados por All Rights Reserved by PHP         |
            | Khmer      | រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ All Rights Reserved by PHP                  |
            | Chinese    | 版权所有 All Rights Reserved by PHP                                 |
            | Arabic     | جميع الحقوق محفوظة لـ All Rights Reserved by PHP                    |

    Scenario Outline: Verify multiple languages <listLanguages> can selected sequentially correctly at Home Page
        Then Verify language selected sequential '<listLanguages>' and display correctly on HomePage
        Examples:
            | listLanguages   |
            | Turkish,English |