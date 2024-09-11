## DVLA Vehicle Enquiry API: Fixed vs. Changing Data Fields
Based on the provided schema for the DVLA Vehicle Enquiry API, the fields can be categorized into "fixed" and "changing" data based on their nature and likelihood of being updated over time. Here’s a breakdown:

### Important Fields

For a vehicle details enquiry, several fields are essential as they provide the core identification, legal status, and technical specifications of a vehicle:

1. **registrationNumber**: The unique identifier of the vehicle.
2. **make**: The manufacturer or brand of the vehicle.
3. **yearOfManufacture**: The year the vehicle was manufactured.
4. **fuelType**: The type of fuel the vehicle uses (e.g., PETROL, DIESEL, ELECTRIC).
5. **colour**: The color of the vehicle.
6. **engineCapacity**: The engine size in cubic centimeters (cc).
7. **co2Emissions**: The carbon dioxide emissions rating, important for environmental and taxation purposes.
8. **taxStatus**: Indicates if the vehicle is taxed, untaxed, or under SORN (Statutory Off Road Notification).
9. **taxDueDate**: The date until which the vehicle is taxed.
10. **motStatus**: The current MOT (Ministry of Transport) status indicating if the vehicle is roadworthy.
11. **motExpiryDate**: The date when the current MOT expires.
12. **markedForExport**: Indicates if the vehicle is marked for export.
13. **automatedVehicle**: Indicates if the vehicle is automated (self-driving).
14. **euroStatus**: The Euro emission standard of the vehicle, crucial for compliance with emission zones.

### Fields Expected to Be Fixed (Static)

These fields are generally unchanging or change very rarely, such as in exceptional administrative cases:

- **registrationNumber**: Fixed once issued unless the number is changed by the owner (e.g., for a personalized plate).
- **make**: Vehicle brand does not change.
- **yearOfManufacture**: Once set, it remains constant.
- **fuelType**: Remains the same unless the vehicle undergoes a significant conversion.
- **engineCapacity**: Typically fixed unless there’s a substantial modification.
- **colour**: While the color could change, it's usually not frequent.
- **typeApproval**: Typically set based on the vehicle's manufacturing specification.
- **wheelplan**: Vehicle structure is unlikely to change unless it undergoes a major conversion.
- **revenueWeight**: Generally fixed as per the vehicle's specifications.
- **realDrivingEmissions**: Once measured, this value doesn’t usually change.
- **euroStatus**: Typically remains constant after manufacture.
- **automatedVehicle**: Unlikely to change once identified as such.

### Fields Expected to Change (Dynamic)

These fields are more likely to be updated periodically as they reflect the vehicle's status or recent administrative changes:

- **taxStatus**: This can change depending on whether the vehicle is currently taxed or declared off-road.
- **taxDueDate**: Updates when a new tax period begins.
- **motStatus**: Changes based on the vehicle’s most recent MOT test.
- **motExpiryDate**: Updated after each MOT test.
- **markedForExport**: This can change if the vehicle is exported.
- **dateOfLastV5CIssued**: This can change whenever a new V5C (logbook) is issued.
- **artEndDate**: If there’s an additional rate of tax, this may have an end date that could change.

### Conclusion

For an application that relies on vehicle data, it is crucial to distinguish between static and dynamic fields. Static fields provide the foundational identity and characteristics of the vehicle, while dynamic fields reflect its current legal and operational status. A combination of both types of fields provides a comprehensive view, allowing for real-time tracking and history analysis of a vehicle’s status and compliance.

## JSON Schema Fields for DVLA Vehicle Enquiry API
```
{
  "openapi": "3.0.0",
  "info": {
    "title": "Vehicle Enquiry API",
    "version": "1.2.0",
    "description": "Interface specification for the DVLA Vehicle Enquiry API",
    "contact": {
      "name": "DVLA API Team",
      "email": "DvlaAPIAccess@dvla.gov.uk"
    }
  },
  "tags": [
    {
      "name": "vehicle"
    }
  ],

  "paths": {
    "/v1/vehicles": {
      "post": {
        "tags": [
          "vehicle"
        ],
        "description": "Returns vehicle details based on registration number",
        "summary": "Get vehicle details by registration number",
        "operationId": "getVehicleDetailsByRegistrationNumber",
        "parameters": [
          {
            "name": "x-api-key",
            "in": "header",
            "description": "Client Specific API Key",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "X-Correlation-Id",
            "in": "header",
            "description": "Consumer Correlation ID",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Registration number of the vehicle to find details for",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/VehicleRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Vehicle"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Vehicle Not Found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "503": {
            "description": "Service Unavailable",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  "servers": [
    {
      "description": "Production environment",
      "url": "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry"
    },
    {
      "description": "Test environment",
      "url": "https://uat.driver-vehicle-licensing.api.gov.uk/vehicle-enquiry"
    }
  ],
  "components": {
    "schemas": {
      "ErrorResponse": {
        "type": "object",
        "description": "Error Response",
        "properties": {
          "errors": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Errors"
            }
          }
        }
      },
      "Errors": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "example": "400"
          },
          "code": {
            "type": "string",
            "example": "105",
            "description": "DVLA reference code"
          },
          "title": {
            "type": "string",
            "example": "Invalid vrn number",
            "description": "Error title"
          },
          "detail": {
            "type": "string",
            "description": "A meaningful description of the error which has occurred",
            "example": "Invalid format for field - vehicle registration number"
          }
        },
        "required": [
          "title"
        ]
      },
      "VehicleRequest": {
        "type": "object",
        "properties": {
          "registrationNumber": {
            "type": "string"
          }
        }
      },
      "Vehicle": {
        "type": "object",
        "required": [
          "registrationNumber"
        ],
        "properties": {
          "registrationNumber": {
            "type": "string",
            "example": "WN67DSO",
            "description": "Registration number of the vehicle"
          },
          "taxStatus": {
            "type": "string",
            "example": "Untaxed",
            "description": "Tax status of the vehicle",
            "enum": [
              "Not Taxed for on Road Use",
              "SORN",
              "Taxed",
              "Untaxed"
            ]
          },
          "taxDueDate": {
            "type": "string",
            "format": "date",
            "example": "2017-12-25",
            "description": "Date of tax liability, used in calculating licence information presented to user"
          },
          "artEndDate": {
            "type": "string",
            "format": "date",
            "example": "2007-12-25",
            "description": "Additional Rate of Tax End Date, format: YYYY-MM-DD"
          },
          "motStatus": {
            "type": "string",
            "example": "No details held by DVLA",
            "description": "MOT Status of the vehicle",
            "enum": [
              "No details held by DVLA",
              "No results returned",
              "Not valid",
              "Valid"
            ]
          },
          "motExpiryDate": {
            "type": "string",
            "format": "date",
            "example": "2008-12-25",
            "description": "Mot Expiry Date"
          },
          "make": {
            "type": "string",
            "example": "ROVER",
            "description": "Vehicle make"
          },
          "monthOfFirstDvlaRegistration": {
            "type": "string",
            "format": "date",
            "example": "2011-11",
            "description": "Month of First DVLA Registration"
          },
          "monthOfFirstRegistration": {
            "type": "string",
            "format": "date",
            "example": "2012-12",
            "description": "Month of First Registration"
          },
          "yearOfManufacture": {
            "type": "integer",
            "format": "int32",
            "example": 2004,
            "description": "Year of Manufacture"
          },
          "engineCapacity": {
            "type": "integer",
            "format": "int32",
            "example": 1796,
            "description": "Engine capacity in cubic centimetres"
          },
          "co2Emissions": {
            "type": "integer",
            "format": "int32",
            "example": 0,
            "description": "Carbon Dioxide emissions in grams per kilometre"
          },
          "fuelType": {
            "type": "string",
            "example": "PETROL",
            "description": "Fuel type (Method of Propulsion)"
          },
          "markedForExport": {
            "type": "boolean",
            "example": true,
            "description": "True only if vehicle has been export marked"
          },
          "colour": {
            "type": "string",
            "example": "Blue",
            "description": "Vehicle colour"
          },
          "typeApproval": {
            "type": "string",
            "example": "N1",
            "description": "Vehicle Type Approval Category"
          },
          "wheelplan": {
            "type": "string",
            "example": "NON STANDARD",
            "description": "Vehicle wheel plan"
          },
          "revenueWeight": {
            "type": "integer",
            "format": "int32",
            "example": 1640,
            "description": "Revenue weight in kilograms"
          },
          "realDrivingEmissions": {
            "type": "string",
            "example": "1",
            "description": "Real Driving Emissions value"
          },
          "dateOfLastV5CIssued": {
            "type": "string",
            "format": "date",
            "example": "2016-12-25",
            "description": "Date of last V5C issued"
          },
          "euroStatus": {
            "type": "string",
            "example": "Euro 5",
            "description": "Euro Status (Dealer / Customer Provided (new vehicles))"
          },
          "automatedVehicle": {
            "type": "boolean",
            "example": true,
            "description": "Automated Vehicle (AV)"
          }
        }
      }
    }
  }
}
```