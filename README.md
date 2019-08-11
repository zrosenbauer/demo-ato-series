# **DISCLAIMER**

The code in this repo _could_ be used to run credential stuffing attacks. The code is super simple and there are a number of tools out there that would do a better job than my late-night hacked codez. This repo is **NOT** meant to be malicious in any manner, quite the opposite. I want to show security and non-security folks how easy it is to run an ATO attack with existing developer tools (I also show you how to stop this attack).

# Introduction

**NOTE:** This is a WIP. I will write up a blog post here next week. 

I couldn't sleep as the [State Farm](https://threatpost.com/state-farm-credential-stuffing-attack/147139/) credential stuffing Account Takeover (ATO) attack was bothering me (most security folks can relate to this). I understand larger organizations have targets on their back but I really feel credential stuffing is an attack vector that with some simple tooling (or an awesome vendor...see below :smile:) you can stop in its tracks. A large majority of the attacks I've seen are very simple in nature and I believe every company should at least have something in place.

## What is Credential Stuffing?

Let's take a look at the OWASP definition:

> Credential stuffing is the automated injection of breached username/password pairs in order to fraudulently gain access to
user accounts. This is a subset of the brute force attack category: large numbers of spilled credentials are automatically entered into websites until they are potentially matched to an existing account, which the attacker can then hijack for their own purposes.

**source:** [https://www.owasp.org/index.php/Credential_stuffing](https://www.owasp.org/index.php/Credential_stuffing)

That feels a bit abstract, especially for the non-security types. Let's simplify this a bit, a credential stuffing attack at its core is when a fraudster takes a list of email & password combos (sometimes from another breach), tries to log in on a website and see which ones let them into the account. They then use the account(s) to commit fraud or sell them on the dark web.

## A very naive demo..

WIP, but take a look at the following files/directories:

- Cred Stuffer - [Link](/bin/cred-stuffer)
- ATOStopper - [Link](/lib/ATOStopper.js)

## How to stop Credential Stuffing (and other ATO).

WIP

## Need Help? - Try [Precognitive](https://precognitive.com/account-takeover/?utm_source=blog&utm_medium=github&utm_campaign=cred-stuffing-simple-demo)

You can use a version of the naive demo to stop attacks but if you want to do more than just stop the simplest
of attacks you should take a look at [Precognitive](https://precognitive.com/account-takeover/?utm_source=blog&utm_medium=github&utm_campaign=cred-stuffing-simple-demo). We've spent the last 3+ years building a platform
that not only stops all types of credential stuffing but also utilizes behavioral analytics, native device integrations, and data modeling to make sure no matter the use case we can tell the bad guys from the good guys.

BTW if you use [Auth0](https://auth0.com/) we have an integration that will be released in the next month or so!

Do you want to learn more? Feel free to [email me](mailto:zac@precognitive.io) directly.

## Credits

[Hackathon-Starter](https://github.com/sahat/hackathon-starter) for an awesome boilerplate I can use to test my hacking skills :smile:
