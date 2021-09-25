correcthorsebatterystaple
=========================

A truly secure [xkcd-style][1] password generator for easy-to-remember
passwords.

I made this site because a lot of alternatives floating around online appear
to work, but implemented in weird, insecure manners. For example, many sites
used `Math.random()` to generate random numbers, which is not a
cryptographically secure generator and should never be used for this purpose.
Furthermore, a lot of them are not open sourced and easily auditable. This
generator is meant to avoid such pitfalls, providing the users with a truly
secure and reliable experience.

For this reason, the website does not use any external scripts, not even
analytics. Since the entire website is aggressively cached on the Cloudflare
edge servers, I have no idea who you are, or how many of you are using it.
To show your support, star this repository.

![preview](preview.png)

  [1]: https://xkcd.com/936/
