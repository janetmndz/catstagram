c1 = Cat.create(name: "Felix")
c2 = Cat.create(name: "Hermeowy")
c3 = Cat.create(name: "Sox")
c4 = Cat.create(name: "Mr. Pickles")
c5 = Cat.create(name: "Garry")

l1 = Location.create(description: "dat catnip on york by teh wework doe", cat: c2)
l2 = Location.create(description: "the old lady down by high street give free food if you meow x3...just don't scare the pidgeons away", cat: c1)
l3 = Location.create(description: "81 prospect rooftop: prime sunbathing location", cat: c3)


# Reactions: 💩, 😻, 🙀, 😼
Reaction.create(cat: c4, location: l3, emoji: "😻")
Reaction.create(cat: c3, location: l1, emoji: "😼")
Reaction.create(cat: c2, location: l2, emoji: "😻")
Reaction.create(cat: c1, location: l3, emoji: "💩")
