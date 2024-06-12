import {
    Links,
    Meta,
    Outlet,
    Scripts,
  } from "@remix-run/react";
import { ARTISTS_NAME_QUERY, ARTISTS_QUERY } from "./queries";

import {createClient} from '@sanity/client'

const client = createClient({
    projectId: 'n4jg9pm4',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2024-06-11', 
  })

export async function getArtists() {
    const artists = await client.fetch(ARTISTS_QUERY)
    return artists
}

export async function getArtistNames() {
    const artists = await client.fetch(ARTISTS_NAME_QUERY)
    return artists
}

export default function App() {
  console.log("hello")
  const artists = getArtistNames();
  console.log("artists", artists)
  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello worlds!</h1>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
  