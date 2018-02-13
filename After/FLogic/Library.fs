namespace FLogic

module Customer =
    open System.Text.RegularExpressions



    type EmailAddress = EmailAddress of string

    let createEmailAddress (s:string) =
        if Regex.IsMatch(s,@"^(.+)@(.+)$")
            then Some (EmailAddress s)
            else None
