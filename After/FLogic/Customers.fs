namespace FLogic

module Customers =
    open System.Text.RegularExpressions
    open System

    type CustomerDTO = {
        Name : string
        Email : string}


    type EmailAddress = EmailAddress of string
    type CustomerName = CustomerName of string
    type ExpirationDate = ExpirationDate of DateTime
    type CustomerStatusType = // enum not a disc union
        | Regular = 1
        | Advanced = 2

    type CustomerStatus = {
        Status : CustomerStatusType
        ExpireDate : ExpirationDate
        }
        

    let createCustomerName (s:string) =
        if s.Length <= 100 && not (String.IsNullOrEmpty s)
            then Ok (CustomerName s)
            else Error "Invalid Name"

    let createEmailAddress (s:string) =
        if Regex.IsMatch(s,@"^(.+)@(.+)$")
            then Ok (EmailAddress s)
            else Error "Invalid Email"

    let createInitialStatus =
        {
            Status = CustomerStatusType.Regular
            ExpireDate = ExpirationDate DateTime.Now}

    type Customer = {
        Name: CustomerName
        Email : EmailAddress
        Status: CustomerStatus

    }

    let createCustomer name email status =
        {
            Name = name
            Email = email
            Status = status}

    let validateCustomer (custDTO : CustomerDTO) =
        let email = 
            match createEmailAddress custDTO.Email with
            | Ok e -> e
            | Error msg -> failwith msg
        let name =
            match createCustomerName custDTO.Name with
            | Ok n -> n
            | Error msg -> failwith msg
        let status = createInitialStatus
        {
            Name = name
            Email = email
            Status = status}
