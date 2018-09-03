renaud [4:09 PM]:

getStream token generator deployed, to retrieve a getStream token, you'll have to call one of the following URLs with a realm access or refresh token in an `Authorization` header:
- `/feed/token/user/:userId`
- `/feed/token/team/:teamId`
- `/feed/token/team/:teamId/product/:productId`
- `/feed/token/team/:teamId/product/:productId?aggregated=true`
- `/feed/token/team/:teamId/supplier/:supplierId`
- `/feed/token/team/:teamId/supplier/:supplierId?aggregated=true` (edited)

you'll then receive something like that:

```{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiJyZWFkIiwiZmVlZF9pZCI6InVzZXJfbm90aWZpY2F0aW9uczZjMGI5NWQ0LTVlNzctNGNhYS1iODI2LWI0NzFlNzAwZDFkNyJ9.Zatz8aOVeFt8Zw9mqWBYF7hc4RaWWVPHqrl-sxAN4MQ",
    "feedName": "user_notifications",
    "feedId": "6c0b95d4-5e77-4caa-b826-b471e700d1d7"
}```

with the getStream token, feedName and feedId to be used to get a feed (edited)
eg.

```curl 'https://ros-dev3.showsourcing.com/feed/token/user/6c0b95d4-5e77-4caa-b826-b471e700d1d7' -H 'Authorization: eyJhcHBfaWQiOiJpby5yZWFsbS5BdXRoIiwiaWRlbnRpdHkiOiI2YzBiOTVkNC01ZTc3LTRjYWEtYjgyNi1iNDcxZTcwMGQxZDciLCJhY2Nlc3MiOlsicmVmcmVzaCJdLCJzYWx0IjoiMjQzZjI3ZGMiLCJleHBpcmVzIjoxODUwNTY4MDkzLCJpc19hZG1pbiI6ZmFsc2UsImlzRW1haWxDb25maXJtZWQiOmZhbHNlfQ==:q3FYi3ZuURFZobkjvLYpe90xOLybilrbBsMDEQV7Y3lVc+MPZstEN4uF17iBHQlMAR8A59ddodpXcCelt5ziH8jqbgHZeYRJtB/llhLRZl1g6HudhGE/x9CN19vsoodf8x6oHhOmmtBmHh+c/xmlXAaqZM2mSIUqmqU3tSUzrx5Dg3or7MUO2N814hIWloPAHBT2Nz6LecFvMejQceBzmCSLEIA/kdg5UP9jcN5TD2PG8gIfKrNkrHb3EoSPKOaOQvhR9rzBOjLRiC096QNUFN5j5AOY+T4mpvdSahDJVWAxGxPD8rcUC+vhBiDHeQafWbGdnizZDVu1HBYEktoxDA=='```