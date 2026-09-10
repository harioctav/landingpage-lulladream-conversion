/**
 * Copy and options for the animal-story builder (create/index.html).
 *
 * Three steps, each one decision, in the order the campaign visitor already
 * thinks in: they arrive having just picked an animal on Instagram, so the
 * animal comes first.
 */
export const builder = {
  title: 'Create Their Animal Story',
  backToSite: '../',
  steps: [
    { id: 'animal', heading: 'Which animal is their favourite?' },
    { id: 'child', heading: 'Who is this story for?' },
    { id: 'mood', heading: 'How should tonight feel?' },
  ],
  next: 'Next',
  generate: 'Generate Story',

  animals: [
    { id: 'lion', emoji: '🦁', name: 'Lion' },
    { id: 'puppy', emoji: '🐶', name: 'Puppy' },
    { id: 'cat', emoji: '🐱', name: 'Cat' },
    { id: 'horse', emoji: '🐴', name: 'Horse' },
    { id: 'snake', emoji: '🐍', name: 'Snake' },
    { id: 'dino', emoji: '🦖', name: 'T-Rex' },
    { id: 'rabbit', emoji: '🐰', name: 'Rabbit' },
    { id: 'elephant', emoji: '🐘', name: 'Elephant' },
    { id: 'other', emoji: '✨', name: 'Another animal' },
  ],
  otherLabel: 'Which animal?',
  otherPlaceholder: 'e.g. Penguin',
  otherMax: 24,

  nameLabel: 'Child’s name',
  namePlaceholder: 'Enter their name',
  nameMax: 50,
  ageLabel: 'How old are they?',
  ages: [
    { id: '1-2', label: '1 – 2 years' },
    { id: '3-4', label: '3 – 4 years' },
    { id: '5-6', label: '5 – 6 years' },
    { id: '7-8', label: '7 – 8 years' },
  ],

  moods: [
    { id: 'gentle', emoji: '🌙', label: 'Gentle & Soothing' },
    { id: 'adventure', emoji: '🗺️', label: 'Adventure-Packed' },
    { id: 'funny', emoji: '😄', label: 'Funny & Lighthearted' },
    { id: 'heartwarming', emoji: '❤️', label: 'Heartwarming' },
  ],

  loading: {
    title: 'Creating Your Story…',
    body: 'Sit tight! Tonight’s story is being written.',
  },

  result: {
    readLabel: 'Read Story',
    listenLabel: 'Listen in your own voice',
    upsellEyebrow: 'Hear it in your voice tonight',
    upsellTitle: 'Unlock unlimited animal stories',
    upsellBody: 'Super Premium reads every story in your own cloned voice, saves them forever, and writes a new one every night.',
    upsellCta: { label: 'Start My 7-Day Free Trial', href: '../#pricing' },
    upsellNote: 'Then USD 3.99 / month · Cancel any time',
    again: 'Make another story',
  },
}
