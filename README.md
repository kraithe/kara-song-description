# Project Name

> Fake SoundCloud App - Song Description Module

## Related Projects

  - https://github.com/lions-beside-us/soundcloudplayer
  - https://github.com/lions-beside-us/soundcloud-images
  - https://github.com/lions-beside-us/comments-service
  - https://github.com/lions-beside-us/hashtags-service
  - https://github.com/lions-beside-us/user-service
  - https://github.com/lions-beside-us/soundcloud-related-tracks

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Routes:

> GET - '/songDescription/:songId'
> Returns a JSON object with all Descriptions data for the given songId

> POST - '/songDescription'
> Adds a new description to the database, returning a log of the data added

> UPDATE - '/songDescription/:songId'
> Updates the .description property to use the user-provided req.params.description, returning a log of the modified data

> DELETE - '/songDescription/:songId'
> Deletes the entire entry of the given songId, returning the data deleted.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

