namespace Flogic.Tests

open System
open Microsoft.VisualStudio.TestTools.UnitTesting
open FLogic
open FLogic.Customer

[<TestClass>]
type TestClass () =

    [<TestMethod>]
    member this.CreateGoodEmail () =
        let email = createEmailAddress "test@test.com"
        Assert.IsTrue(email.IsSome);


    [<TestMethod>]
    member this.CreateEmailFail () =
        let email = createEmailAddress "testtest.com"
        Assert.IsTrue(email.IsNone);