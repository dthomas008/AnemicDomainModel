namespace Flogic.Tests

open System
open Microsoft.VisualStudio.TestTools.UnitTesting
open FLogic.Customers

open FluentAssertions

[<TestClass>]
type TestClass () =

    [<TestMethod>]
    member this.CreateEmailPass () = 
        match createEmailAddress "test@test.com" with
            | Ok email -> Assert.IsNotNull(email)
            | Error msg -> failwith "good email should be created"


    [<TestMethod>]
    member this.CreateEmailFail () = 
        match createEmailAddress "testtest.com" with
        | Ok email -> failwith "bad email should not be created"
        | Error msg -> Assert.IsTrue(msg.Equals "Invalid Email") 
        

    [<TestMethod>]
    member this.CreateCustomer () =
        let email = 
            let emailDTO = createEmailAddress "test@test.com"
            match emailDTO with
            | Ok emailDTO ->  emailDTO
            | Error msg-> failwith msg

        let name = 
            let nameDTO = createCustomerName "Fred"
            match nameDTO with
            | Ok n ->  n
            | Error msg-> failwith msg

        let status = 
            createInitialStatus
        let cust = 
            createCustomer name email status
        Assert.IsNotNull(cust)

    [<TestMethod>]
    member this.ValidateCustomer () =
        let custDTO = {Name = "Freddy" ; Email = "fred@test.com" }
        let cust =
            validateCustomer custDTO
        Assert.IsNotNull(cust)