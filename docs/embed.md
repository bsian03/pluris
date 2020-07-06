
# embed
Embed Constructor for sending embeds

## channel.createMessage(options);
> | Parameter | Type  | Default   | Description |
> |-----------|-------|-----------|-------------|
> | [embed]   | Embed | undefined | Embed class |

## Class: Embed
### Constructor `new Eris.Embed(data);`
> | Parameter | Type   | Default | Description             |
> |-----------|--------|---------|-------------------------|
> | data      | Object | {}      | Embed Data from Discord |

### Properties
> | Property    | Type          | Description       |
> |-------------|---------------|-------------------|
> | title       | String?       | Embed Title       |
> | description | String?       | Embed Description |
> | url         | String?       | Embed URL         |
> | timestamp   | Date?         | Embed Date        |
> | color       | Number?       | Embed Color       |
> | footer      | Object?       | Embed Footer      |
> | image       | Object?       | Embed Image       |
> | thumbnail   | Object?       | Embed Thumbnail   |
> | author      | Object?       | Embed Author      |
> | fields      | Array\<Field> | Embed Fields      |

### Functions
#### setTitle(title)
> Sets the Embed Title
> | Parameter | Type   | Default | Description |
> |-----------|--------|---------|-------------|
> | title     | String |         | Embed Title |
>
> Returns `Embed`

#### setDescription(description)
> Sets the Embed Description
> | Parameter   | Type   | Default | Description       |
> |-------------|--------|---------|-------------------|
> | description | String |         | Embed Description |
>
> Returns `Embed`

#### setURL(url)
> Sets the Embed URL
> | Parameter | Type   | Default | Description |
> |-----------|--------|---------|-------------|
> | url       | String |         | Embed URL   |
>
> Returns `Embed`

#### setTimestamp(timestamp)
> Sets the Embed Timestamp
> | Parameter   | Type                 | Default    | Description     |
> |-------------|----------------------|------------|-----------------|
> | [timestamp] | String\|Number\|Date | new Date() | Embed Timestamp |
>
> Returns `Embed`

#### setColor(color)
> Sets the Embed Color
> | Parameter | Type           | Default | Description |
> |-----------|----------------|---------|-------------|
> | color     | String\|Number |         | Embed Color |
>
> Returns `Embed`

#### setFooter(text, iconURL)
> Sets the Embed Footer
> | Parameter | Type   | Default | Description |
> |-----------|--------|---------|-------------|
> | text      | String |         | Footer Text |
> | [iconURL] | String |         | Footer Icon |
>
> Returns `Embed`

#### setImage(imageURL)
> Sets the Embed Image
> | Parameter | Type   | Default | Description |
> |-----------|--------|---------|-------------|
> | imageURL  | String |         | Embed Image |
>
> Returns `Embed`

#### setThumbnail(thumbnailURL)
> Sets the Embed Thumbnail
> | Parameter    | Type   | Default | Description     |
> |--------------|--------|---------|-----------------|
> | thumbnailURL | String |         | Embed Thumbnail |
>
> Returns `Embed`

#### setAuthor(name, url, iconURL)
> Sets the Embed Author
> | Parameter | Type   | Default | Description |
> |-----------|--------|---------|-------------|
> | name      | String |         | Author Name |
> | [url]     | String |         | Author URL  |
> | [iconURL] | String |         | Author Icon |
>
> Returns `Embed`

#### addField(name, value, inline)
> Adds an Embed Field
> | Parameter | Type    | Default | Description  |
> |-----------|---------|---------|--------------|
> | name      | String  |         | Field Name   |
> | value     | String  |         | Field Value  |
> | [inline]  | Boolean | false   | Field Inline |
>
> Returns `Embed`