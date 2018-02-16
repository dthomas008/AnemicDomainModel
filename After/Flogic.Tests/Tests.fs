namespace Flogic.Tests

open System
open Microsoft.VisualStudio.TestTools.UnitTesting
open FLogic
open FLogic.Customer
open FluentAssertions

[<TestClass>]
type TestClass () =

    [<TestMethod>]
    member this.CreateEmailPass () =
        let email = createEmailAddress "test@test.com"
        Assert.IsTrue(email.IsSome)
       // email.Should().


    [<TestMethod>]
    member this.CreateEmailFail () =
        let email = createEmailAddress "testtest.com"
        Assert.IsTrue(email.IsNone)