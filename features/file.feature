Feature: files

    Scenario: get the content of a file
        Given a file on "locale"
        When the locale is sent to the class
        Then the class should return the "content"

            |locale                  |content|
            |localhost:8000/fileA.txt|file A |
