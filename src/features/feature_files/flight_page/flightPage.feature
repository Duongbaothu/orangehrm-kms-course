Feature: Search for a flight
  As a guest, I can search for a flight

	Background: Open browser and navigate to tour page
		When A user visits 'https://phptravels.net/flights'
    Then verify page label Search for Best Flights as "SEARCH FOR BEST FLIGHTS"
    And set:
      | year                           | month                                                      | day                                                   | dayReturn                                               |
      | ${new Date().getUTCFullYear()} | ${(new Date().getMonth() + 1).toString().padStart(2, '0')} | ${(new Date().getDate()).toString().padStart(2, '0')} | ${(new Date().getDate()+2).toString().padStart(2, '0')} |

  @HappyCases
    Scenario Outline: HappyCase - <No.>: Verify the flight is searched successfully <testcase> with ticket type is one way
      Given user click ticket type is 'one-way'
      And user select "<class>" class flight
      And user type "<flyingFrom>" into Flying From
      And user type "<toDestination>" into To Destination
      And user fill "<departureDate>" into Departure Date
      And fill passengers with '<adults>' adults and '<childs>' childs
      When user click Flights Search button
      Then verify the Flying From is displayed correct as "<flyingFrom>"
      And verify the To Destination is displayed correct as "<toDestination>"
      And verify the Date Flights is displayed correct as "<departureDate>"
      And verify the Passengers are displayed correct as '<adults>' adults and '<childs>' childs
      And verify the result Flights is displayed as "Flight Stops"

      Examples:
        | No.    | testcase                                                          | class           | flyingFrom | toDestination | departureDate           | adults | childs |
        | Case01 | when providing all fields are valid with One Way                  | enconomy        | CGK        | DPS           | ${day}-${month}-${year} | 1      | 1      |
        | Case02 | when providing all fields are valid with enconomy class           | enconomy        | CGK        | DPS           | ${day}-${month}-${year} | 1      | 1      |
        | Case03 | when providing all fields are valid with economy-premium class    | economy-premium | CGK        | DPS           | ${day}-${month}-${year} | 1      | 1      |
        | Case04 | when providing all fields are valid with business class           | business        | CGK        | DPS           | ${day}-${month}-${year} | 1      | 1      |
        | Case05 | when providing all fields are valid with first class              | first           | CGK        | DPS           | ${day}-${month}-${year} | 1      | 1      |
        | Case06 | when providing all fields are valid with multiple (3) passengers  | enconomy        | CGK        | DPS           | ${day}-${month}-${year} | 2      | 1      |
        | Case07 | when providing all fields are valid with only passenger is adult  | enconomy        | CGK        | DPS           | ${day}-${month}-${year} | 1      | 0      | 
        | Case08 | when providing all fields are valid with only passenger is child  | enconomy        | CGK        | DPS           | ${day}-${month}-${year} | 0      | 1      | 

  @HappyCases
    Scenario Outline: HappyCase - <No.>: Verify the flight is searched successfully <testcase> with ticket type is round trip
      Given user click ticket type is 'round-trip'
      And user select "<class>" class flight
      And user type "<flyingFrom>" into Flying From
      And user type "<toDestination>" into To Destination
      And user fill "<departureDate>" into Departure Date
      And user fill "<returnDate>" into Reture Date
      And fill passengers with '<adults>' adults and '<childs>' childs
      When user click Flights Search button
      Then verify the Flying From is displayed correct as "<flyingFrom>"
      And verify the Date Flights are displayed as "( <departureDate>" departureDate and "<returnDate> )" returnDate
      And verify the Passengers are displayed correct as '<adults>' adults and '<childs>' childs
      And verify the result Flights is displayed as "Flight Stops"

      Examples:
        | No.    | testcase                                                          | class           | flyingFrom | toDestination | departureDate           | returnDate                    | adults | childs |
        | Case09 | when providing all fields are valid with One Way                  | enconomy        | CGK        | DPS           | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} | 1      | 1      |
        | Case10 | when providing all fields are valid with enconomy class           | enconomy        | CGK        | DPS           | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} | 1      | 1      |
        | Case11 | when providing all fields are valid with economy-premium class    | economy-premium | CGK        | DPS           | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} | 1      | 1      |
        | Case12 | when providing all fields are valid with business class           | business        | CGK        | DPS           | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} | 1      | 1      |
        | Case13 | when providing all fields are valid with first class              | first           | CGK        | DPS           | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} | 1      | 1      |
        | Case14 | when providing all fields are valid with multiple (3) passengers  | enconomy        | CGK        | DPS           | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} | 2      | 1      |
        | Case15 | when providing all fields are valid with only passenger is adult  | enconomy        | CGK        | DPS           | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} | 1      | 0      | 
        | Case16 | when providing all fields are valid with only passenger is child  | enconomy        | CGK        | DPS           | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} | 0      | 1      | 


  @ErrorCases
    Scenario Outline: ErrorCase - <No.>: Verify the flight is searched failed <testcase> with ticket type is round trip
      Given user click ticket type is 'round-trip'
      And user select "<class>" class flight
      And user type "<flyingFrom>" into Flying From
      And user type "<toDestination>" into To Destination
      And user fill "<departureDate>" into Departure Date
      And user fill "<returnDate>" into Reture Date
      And fill passengers with '1' adults and '1' childs
      When user click Flights Search button
      Then verify the button "Back To Search" is displayed
      
      Examples:
        | No.    | testcase                                                                  | flyingFrom | toDestination | departureDate           | returnDate                    |
        | Case17 | when providing Flying From field is invalid and other fields are valid    | CGKG       | DPS           | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} |
        | Case18 | when providing To Destination field is invalid and other fields are valid | CGK        | DPSF          | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} |

  @ErrorCases
    Scenario Outline: ErrorCase - <No.>: Verify the flight is searched failed <testcase> with ticket type is one way
      Given user click ticket type is 'one-way'
      And user select "<class>" class flight
      And user type "<flyingFrom>" into Flying From
      And user type "<toDestination>" into To Destination
      And user fill "<departureDate>" into Departure Date
      And fill passengers with '1' adults and '1' childs
      When user click Flights Search button
      Then verify the button "Back To Search" is displayed
      
      Examples:
        | No.    | testcase                                                                  | flyingFrom | toDestination | departureDate           |
        | Case19 | when providing Flying From field is invalid and other fields are valid    | CGKG       | DPS           | ${day}-${month}-${year} |
        | Case20 | when providing To Destination field is invalid and other fields are valid | CGK        | DPSF          | ${day}-${month}-${year} |
           
  @ErrorCases
    Scenario Outline: ErrorCase - <No.>: Verify the flight is searched failed <testcase>with ticket type is round trip
      Given user click ticket type is 'round-trip'
      And user select "<class>" class flight
      And user type "<flyingFrom>" into Flying From
      And user type "<toDestination>" into To Destination
      And user fill "<departureDate>" into Departure Date
      And user fill "<returnDate>" into Reture Date
      And fill passengers with '<adults>' adults and '<childs>' childs
      When user click Flights Search button
      Then verify pop up message error is displayed
      
      Examples:
        | No.    | testcase                                                                  | flyingFrom | toDestination | departureDate           | returnDate                    |
        | Case21 | when providing Flying From field is empty and other fields are valid      |            | DPS           | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} |
        | Case22 | when providing To Destination field is empty and other fields are valid   | CGK        |               | ${day}-${month}-${year} | ${dayReturn}-${month}-${year} |
        | Case23 | when providing Departure Date field is empty and other fields are valid   | CGK        | DPS           |                         | ${dayReturn}-${month}-${year} |
        | Case24 | when providing Return Date field is empty and other fields are valid      | CGK        | DPS           | ${day}-${month}-${year} |                               |
        | Case25 | when providing Departure Date field is invalid and other fields are valid | CGK        | DPS           | 21-10-2022              | ${dayReturn}-${month}-${year} |
        | Case26 | when providing Return Date field is invalid and other fields are valid    | CGK        | DPS           | ${day}-${month}-${year} | 21-10-2022                    |

  @ErrorCases
    Scenario Outline: ErrorCase - <No.>: Verify the flight is searched failed <testcase>with ticket type is one way
      Given user click ticket type is 'one-way'
      And user select "<class>" class flight
      And user type "<flyingFrom>" into Flying From
      And user type "<toDestination>" into To Destination
      And user fill "<departureDate>" into Departure Date
      And fill passengers with '<adults>' adults and '<childs>' childs
      When user click Flights Search button
      Then verify pop up message error is displayed
      
      Examples:
        | No.    | testcase                                                                  | flyingFrom | toDestination | departureDate           |
        | Case28 | when providing Flying From field is empty and other fields are valid      |            | DPS           | ${day}-${month}-${year} |
        | Case28 | when providing To Destination field is empty and other fields are valid   | CGK        |               | ${day}-${month}-${year} |
        | Case29 | when providing Departure Date field is empty and other fields are valid   | CGK        | DPS           |                         |
        | Case30 | when providing Departure Date field is invalid and other fields are valid | CGK        | DPS           | 21-10-2022              |
          