/**
 * Story generator — the single integration point for the builder.
 *
 * THIS IS A STUB. It assembles a story from written templates so the campaign
 * flow can be built and tested end to end; it does not call the LullaDream
 * model. Replace the body of `generateStory` with the real API request before
 * launch. Keep the signature: the builder awaits
 * `generateStory({ name, age, animal, mood })` and renders
 * `{ title, category, paragraphs }`.
 *
 * The child is always referred to by name, never by pronoun, so no template
 * has to guess.
 */

const animals = {
  lion: {
    title: '{name} and the Lion Who Lost His Roar',
    meet: 'Deep in the golden grass lived a lion called Leo, whose roar could shake the leaves off every tree.',
    problem: 'But one evening Leo opened his mouth and only a tiny squeak came out. He hid behind a rock, far too embarrassed to go home.',
    help: '{name} found him there and sat down beside him. “Maybe your roar is just tired,” said {name}. “Everybody gets tired at bedtime.”',
    resolution: 'So they breathed slowly together, in and out, until the stars came up — and Leo let out the softest, warmest roar the savannah had ever heard. It sounded exactly like goodnight.',
  },
  puppy: {
    title: '{name} and the Puppy Who Waited by the Door',
    meet: 'In a little yellow house lived a puppy called Biscuit, whose tail never, ever stopped wagging.',
    problem: 'Every night Biscuit sat by the door, waiting for someone to come home — and every night the waiting felt very long.',
    help: '{name} knelt down and scratched behind Biscuit’s floppy ears. “You don’t have to wait alone,” said {name}. “I’ll wait with you.”',
    resolution: 'They curled up on the doormat together, and before long the door creaked open and everyone Biscuit loved came tumbling in. Biscuit’s tail wagged so hard it nearly flew away.',
  },
  cat: {
    title: '{name} and the Cat Who Owned the Moon',
    meet: 'On the highest rooftop in town lived a silver cat called Luna, who believed the moon belonged to her.',
    problem: 'One night a cloud drifted across the sky and swallowed the moon whole. Luna meowed and meowed, but the cloud would not move.',
    help: '{name} climbed up beside her. “Clouds are shy,” whispered {name}. “If we’re very quiet, it might say sorry.”',
    resolution: 'So they sat as still as two statues — and slowly, gently, the cloud slid away, and the moon shone brighter than ever. Luna purred so loudly the chimneys hummed along.',
  },
  horse: {
    title: '{name} and the Horse Who Ran to the Sea',
    meet: 'In a wide green meadow lived a chestnut horse called Comet, who could run faster than the wind.',
    problem: 'Comet had heard stories of a place where the grass turned to sand and the sky touched the water, but had never been brave enough to go.',
    help: '{name} climbed onto Comet’s back and held on tight. “Let’s find it together,” said {name}. “I’ll tell you when we’re close.”',
    resolution: 'They galloped over hills and through the silver night until they reached the sea, and the waves came whispering up to say hello. Comet had never felt so free.',
  },
  snake: {
    title: '{name} and the Snake Who Learned to Sing',
    meet: 'Under a mossy log lived a green snake called Sully, who was very clever and very, very quiet.',
    problem: 'All the birds sang at sunset, and Sully wished more than anything to join in — but every time Sully tried, only a “hissss” came out.',
    help: '{name} lay down in the soft moss. “A hiss can be a song too,” said {name}. “Let’s make it into a lullaby.”',
    resolution: 'Together they hissed and hummed, slow and low, until the whole forest was swaying along. The birds stopped to listen, and Sully sang the sweetest song in the woods.',
  },
  dino: {
    title: '{name} and the T-Rex Who Was Afraid of the Dark',
    meet: 'In a valley of giant ferns lived a T-Rex called Rexy — the biggest, stompiest dinosaur anyone had ever seen.',
    problem: 'But when the sun went down, Rexy’s knees wobbled. The dark was so big, and Rexy’s little arms were so small.',
    help: '{name} held up a glowing jar of fireflies. “The dark is just the day having a rest,” said {name}. “Let’s go and see.”',
    resolution: 'Step by stomping step they walked into the night, and the fireflies twinkled all around them like tiny friendly stars. Rexy wasn’t scared at all anymore.',
  },
  rabbit: {
    title: '{name} and the Rabbit Who Couldn’t Sit Still',
    meet: 'In a burrow under the old oak tree lived a rabbit called Pip, who hopped from morning until night.',
    problem: 'When bedtime came, Pip’s feet kept hopping — hop, hop, hop — and no matter how hard Pip tried, sleep would not come.',
    help: '{name} fluffed up a pillow of clover. “Let’s count the stars instead of hops,” said {name}. “One… two… three…”',
    resolution: 'By the time they reached twenty, Pip’s feet were still, Pip’s ears were drooping, and the whole burrow was warm and quiet. Pip had finally found the sleepiest place of all.',
  },
  elephant: {
    title: '{name} and the Elephant Who Never Forgot',
    meet: 'At the edge of the jungle lived a young elephant called Ellie, who remembered every single thing.',
    problem: 'But tonight Ellie had forgotten the way home, and the jungle paths all looked the same in the dark.',
    help: '{name} took hold of Ellie’s trunk. “You remember everything,” said {name}. “Do you remember the sound of the river?”',
    resolution: 'Ellie listened, and there it was — a soft, familiar splashing. They followed it all the way home, where Ellie’s family was waiting with the biggest hug in the jungle.',
  },
}

/** For "another animal": the parent's own word, dropped into a gentle frame. */
const other = {
  title: '{name} and the Brave Little {Animal}',
  meet: 'At the edge of a sleepy forest lived a little {animal} who had never once been outside after dark.',
  problem: 'Tonight the {animal} wanted to see the stars, but the shadows looked very big and very close.',
  help: '{name} walked right up beside the {animal}. “We’ll look together,” said {name}. “Shadows are just the night getting comfortable.”',
  resolution: 'Side by side they climbed the tallest hill, and there were the stars — thousands of them, twinkling hello. The little {animal} wasn’t scared at all anymore.',
}

const moods = {
  gentle: {
    label: 'Gentle & Soothing',
    open: 'When the sky turned the colour of warm milk and the first star blinked awake, {name} tiptoed softly into a dream.',
    close: 'And as the night grew quiet, {name} yawned one last yawn, snuggled down deep, and drifted off to sleep. Goodnight, {name}.',
  },
  adventure: {
    label: 'Adventure-Packed',
    open: 'The moment {name}’s eyes closed, the bed became a boat, the boat became a map, and the map led somewhere nobody had ever been.',
    close: 'Then {name} waved goodbye, promised to come back tomorrow, and sailed home just in time to fall fast asleep. What an adventure. Goodnight, {name}.',
  },
  funny: {
    label: 'Funny & Lighthearted',
    open: 'Tonight {name}’s pillow had a very important announcement: “Everybody hold on to your pyjamas — we’re going on a trip!”',
    close: 'Everyone giggled so hard that the moon had to say “shhh” — and then, one by one, they all fell asleep, {name} first of all. Goodnight, {name}.',
  },
  heartwarming: {
    label: 'Heartwarming',
    open: '{name} hugged the softest blanket in the house, and the blanket, as blankets sometimes do, hugged back — and carried {name} off to a faraway place.',
    close: 'Before sleep came, {name} whispered, “Will you be here tomorrow?” “Always,” came the answer. And {name} slept, feeling very, very loved. Goodnight, {name}.',
  },
}

const capitalise = (word) => word.charAt(0).toUpperCase() + word.slice(1)

function fill(text, vars) {
  return text
    .replaceAll('{name}', vars.name)
    .replaceAll('{Animal}', capitalise(vars.animal))
    .replaceAll('{animal}', vars.animal)
}

/**
 * @param {{ name: string, age: string, animal: { id: string, name: string, custom?: string }, mood: string }} input
 * @returns {Promise<{ title: string, category: string, paragraphs: string[] }>}
 */
export async function generateStory({ name, age, animal, mood }) {
  const custom = animal.id === 'other'
  const template = custom ? other : animals[animal.id]
  const tone = moods[mood] ?? moods.gentle
  const vars = {
    name: name.trim(),
    animal: custom ? animal.custom.trim().toLowerCase() : animal.name.toLowerCase(),
  }

  const paragraphs = [
    `${tone.open} ${template.meet}`,
    `${template.problem} ${template.help}`,
    template.resolution,
    tone.close,
  ].map((p) => fill(p, vars))

  return {
    title: fill(template.title, vars),
    category: `${tone.label} · Ages ${age}`,
    paragraphs,
  }
}
