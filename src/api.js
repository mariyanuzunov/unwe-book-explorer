import { normalize } from './utilities';

const URL = 'https://www.googleapis.com/books/v1/volumes/';
const FIELDS_FEATURED =
  '?fields=(id,volumeInfo(title,subtitle,authors,imageLinks/thumbnail))';
const API_KEY = `&key=${process.env.REACT_APP_API_KEY}`;

// TODO: Refactor api calls

export async function get2021BestSellers() {
  const ids = [
    'nNjTDwAAQBAJ',
    'Ed8nEAAAQBAJ',
    'Kn4eEAAAQBAJ',
    'yqksEAAAQBAJ',
    'sqVPEAAAQBAJ',
  ];

  const batch = ids.map(id => fetch(URL + id + FIELDS_FEATURED));

  const responses = await Promise.all(batch);
  const data = await Promise.all(responses.map(res => res.json()));
  return normalize(data);
}

export async function getAllTimeBestSellers() {
  const ids = [
    'wT8817AhkMAC',
    'FzfIrQEACAAJ',
    '2jg9DwAAQBAJ',
    'KbC_uQAACAAJ',
    'FzVjBgAAQBAJ',
  ];

  const batch = ids.map(id => fetch(URL + id + FIELDS_FEATURED));

  const responses = await Promise.all(batch);
  const data = await Promise.all(responses.map(res => res.json()));
  return normalize(data);
}

export async function getMustRead() {
  const ids = [
    'B1hSG45JCX4C',
    '5NomkK4EV68C',
    'AJ4REAAAQBAJ',
    'PGR2AwAAQBAJ',
    'Xfze51E7TEoC',
  ];

  const batch = ids.map(id => fetch(URL + id + FIELDS_FEATURED));

  const responses = await Promise.all(batch);
  const data = await Promise.all(responses.map(res => res.json()));
  return normalize(data);
}
