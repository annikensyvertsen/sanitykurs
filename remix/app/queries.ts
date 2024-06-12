import groq from 'groq'
export const ARTISTS_QUERY = groq`*[_type == "artist"]`
export const ARTISTS_NAME_QUERY = groq`*[_type == "artist"]{name}`
export const EVENTS_QUERY = groq`*[_type == "event" && defined(slug.current)]{_id, name, slug, date}|order(date desc)`

