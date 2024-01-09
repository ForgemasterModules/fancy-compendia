# Fancy Compendia

![Supported Foundry Versions](https://img.shields.io/endpoint?url=https://foundryshields.com/version?url=https://github.com/ForgeMastermodules/fancy-compendia/releases/latest/download/system.json&color=blue)
![Latest Release Download Count](https://img.shields.io/github/downloads/ForgeMastermodules/fancy-compendia/latest/fancy-compendia.zip)
[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fa5e&colorB=brightgreen)](https://forge-vtt.com/bazaar#package=fancy-compendia)
[![Discord](https://img.shields.io/discord/957965481455788032?label=A5e%20Foundry%20Discord)](https://discord.gg/XtkZ6RkN9E)


Fancy compendia is a semi-system agnostic module that overrides the core compendium sheets, adding more functionality and giving the sheets a visual makeover.

## Features

### Visual Makeover
The module introduces a new UI for compendium sheets to make searching for documents easier. The new sheets offer two modes of viewing the pack - List mode and Grouped mode. List mode is the default mode and lists all the documents alphabetically, whereas grouped mode groups the various documents based on a predefined criteria.

<!-- Image of the two modes -->
![](/imgs/list-mode.png)
![](/imgs/grouped-mode.png)

### Filters
Each compendium sheet allows users to filter the documents in the pack to narrow down what they're looking for. Filtering is extremely configurable, allowing users to exclude a criteria while including others. Both exclusion and inclusion filters have configurable modes that can do either an "OR" operation or an "AND" operation.

![](/imgs/filter-view.png)

### RollTable
The new sheets allow a filtered selection to be exported to a roll table ready to be used later.

![](/imgs/rolltable-view.png)

### Settings
By default only compendia that ships with the system is assigned the new interface but this can be easily extended to other compendia. One simple way to do this is to enable the "Automatically Apply Fancy Sheets to Compendia" setting. This makes it so that the module tries to figure out what the right type of sheet is for a particular compendium pack. Do note that for this to work the compendium must contain either only one type of document or a documents of type that are registered with the auto mapping config.

Another alternative way is via the `customPackMappings` setting. Something to note is that any compendia that are configured via the `auto mapping` also end up in the `customPackMappings`. The setting itself is an object that takes the pack id as a key and they type as value.

```js
{
  'dnd5e.monsters': 'monster',
  'dnd5e.spells': 'spell',
  'dnd5e.items': 'object',
  'dnd5e.tradegoods': 'object'
}
```

## Supported Systems
- DND5E

## Funding
If you'd like to support the development of this module, please consider becoming a patron. In addition to helping fund module development, patrons also get early access to exclusive modules. You can find our Patreon page below.

[![Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3DForgemasterModules%26type%3Dpatrons&style=for-the-badge)](https://patreon.com/ForgemasterModules)
