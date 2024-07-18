export default function chooseRandomAvatar() {
  const avatars = [
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Midnight',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Annie',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Cali',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Cuddles',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Angel',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Oscar',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Sasha',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Boots',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Ginger',
  ];

  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
}
