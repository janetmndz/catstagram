c1 = Cat.create(name: "Felix")
c2 = Cat.create(name: "Hermeowy")
c3 = Cat.create(name: "Sox")
c4 = Cat.create(name: "Mr. Pickles")
c5 = Cat.create(name: "Garry")

l1 = Location.create(description: "dat catnip on york by teh wework doe", cat: c2, picture: "https://placekitten.com/500/500")
l2 = Location.create(description: "the old lady down by high street give free food if you meow x3...just don't scare the pidgeons away", cat: c1, picture: "https://placekitten.com/500/500")
l3 = Location.create(description: "81 prospect rooftop: prime sunbathing location", cat: c3, picture: "https://placekitten.com/500/500")
l4 = Location.create(description: "Dog sighting here! scurry awayyy", cat: c4, picture: "https://placekitten.com/500/500")
l5 = Location.create(description: "Seafood market always gives out free fish if you meow nicely and wait at the door", cat: c1, picture: "https://placekitten.com/500/500")
l6 = Location.create(description: "Prime bird watching spot. Or bird pouncing spot!", cat: c5, picture: "https://placekitten.com/500/500")
l7 = Location.create(description: "Midnight acapell group's new locations! Come on by 2am to see the group!", cat: c2, picture: "https://placekitten.com/500/500")
l8 = Location.create(description: "New cat in town! House cat!", cat: c5, picture: "https://placekitten.com/500/500")


# Reactions: 💩, 😻, 🙀, 😼
Reaction.create(cat: c4, location: l3, emoji: "😻")
Reaction.create(cat: c3, location: l1, emoji: "😼")
Reaction.create(cat: c2, location: l2, emoji: "😻")
Reaction.create(cat: c1, location: l3, emoji: "💩")
