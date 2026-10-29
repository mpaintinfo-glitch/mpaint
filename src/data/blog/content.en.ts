import type { ArticleContent } from "./types";
import type { ArticleId } from "../blog";

export const content_en: Record<ArticleId, ArticleContent> = {
  paintingCost: {
    title: "How much does car painting cost in Estonia?",
    description:
      "What affects the price of car painting: number of panels, paint type, prep work, and the car's condition. Mpaint's confirmed starting prices in Tallinn.",
    excerpt: "Car painting prices depend on several factors. Here is what actually drives the cost, and our confirmed starting prices.",
    intro: [
      "We get asked about car painting prices almost every day, and there is no single answer. Painting a single panel and a full respray are very different jobs in terms of cost, and even two similar-looking damages can cost differently depending on the paint type and how much prep work is needed.",
    ],
    sections: [
      {
        heading: "What affects the price the most",
        paragraphs: [
          "The biggest factor is the size of the surface being painted and the number of panels. Painting one door or a bumper is a completely different job from a full respray, which means taking the whole car apart and putting it back together. That takes up most of the time, not the paint drying.",
          "The second big factor is the paint type. A standard solid colour is the cheapest option. Metallic finishes cost more because they need a more precise colour match, and pearl finishes cost even more, since they need two separate coats of paint to get the right depth.",
          "The third factor is prep work: whether the surface just needs cleaning and sanding, or whether rust needs removing first, dents need pulling out, or damaged parts need replacing. The more prep work involved, the higher the final price.",
        ],
      },
      {
        heading: "Our confirmed starting prices",
        paragraphs: [
          "At Mpaint, painting a single panel, such as a door, bumper, or wing, starts from 250 euros. Painting the bonnet or roof, which are larger and more complex surfaces, starts from 450 euros. Cleaning and treating rust damage starts from 50 euros, depending on the extent and depth of the damage and how accessible it is. The exact price is always confirmed after we have seen the damage.",
        ],
      },
      {
        heading: "Why the price can differ from the first estimate",
        paragraphs: [
          "When an estimate is based on photos alone, the actual extent of the damage can only come to light once the car is in the workshop. A scratch can hide a deeper dent or hidden rust that does not show up in a photo. That is why we always give the final price after seeing the car.",
        ],
      },
      {
        heading: "How to keep the price reasonable",
        paragraphs: [
          "If the damage is minor and the paint layer is intact, it is worth considering polishing first: it is cheaper than painting and works for surface-level scratches. But if a scratch goes through the paint layer, polishing will not fix it and the area needs painting.",
        ],
      },
    ],
    faq: [
      { q: "Is requesting a quote free?", a: "Yes, requesting a quote costs nothing." },
      {
        q: "Is it cheaper to paint only the damaged spot instead of the whole panel?",
        a: "The whole panel is usually painted, for example an entire door, so the colour and finish stay even and blend with the neighbouring panels. Painting just the damaged spot usually leaves a visible edge.",
      },
    ],
  },

  scratchRepair: {
    title: "How to tell if a scratch on your car needs painting",
    description: "Not every scratch needs painting. Here is how to judge the depth of a scratch yourself and when polishing is enough.",
    excerpt: "A surface-level scratch and one that reaches the paint layer need completely different fixes. Here is how to tell them apart.",
    intro: [
      "A car typically has three layers: primer, paint, and a glossy top protective layer called clearcoat. How deep a scratch goes through these layers decides whether polishing is enough or whether painting is needed.",
    ],
    sections: [
      {
        heading: "A simple way to check a scratch yourself",
        paragraphs: [
          "Run your fingernail gently over the scratch. If your nail does not catch on it, and the scratch almost disappears when the surface is wet, it is likely a surface-level clearcoat scratch. If your nail clearly catches on the scratch and you can see a different colour underneath, the scratch has probably gone through the paint layer.",
          "Also look at the colour inside the scratch. If you see white or grey, that is plastic or primer. If you see a metallic shine, the scratch has reached the car's metal body. In that case there is also a risk of rust, and painting is needed sooner.",
        ],
      },
      {
        heading: "When polishing is enough",
        paragraphs: [
          "If the scratch is only in the clearcoat and the paint layer itself is intact, polishing usually removes it completely. It is a cheaper and faster fix than painting.",
        ],
      },
      {
        heading: "When painting is needed",
        paragraphs: [
          "If the scratch goes through the paint layer down to the primer or metal, polishing will not fix it: the scratch stays visible, and exposed metal will start to rust. In that case the part needs repainting. The whole panel is usually painted, not just the scratched spot, so the colour stays even.",
        ],
      },
      {
        heading: "What not to do",
        paragraphs: [
          "Internet tips like toothpaste or nail polish remover to hide a scratch do not restore the paint layer. They can temporarily make a surface scratch less visible, but they do not fix damage that goes through the paint, and they can damage the surface further.",
        ],
      },
    ],
    faq: [
      {
        q: "Can a scratch be fixed without repainting the part?",
        a: "Sometimes. If the scratch is surface-level and the paint layer is intact, polishing is often enough. If the scratch goes through the paint or down to the metal, it needs painting.",
      },
      { q: "Can polishing remove any scratch?", a: "No. Polishing only works for surface-level scratches. Deeper scratches need painting." },
    ],
  },

  accidentFirstSteps: {
    title: "What to do if your car is damaged in an accident",
    description: "The first steps after a collision: safety, documenting the damage, and when a car should no longer be driven.",
    excerpt: "After an accident, acting in the right order matters. Here is a practical guide to the first steps.",
    intro: [
      "After an accident, safety comes first, not the condition of the car. If anyone is hurt, call emergency services. If everyone is fine and the car is still on the road, move it to a safe spot if possible and turn on the hazard lights.",
    ],
    sections: [
      {
        heading: "Document the damage",
        paragraphs: [
          "Before moving the car, if it is safe to do so, take photos of the damage from several angles: this is useful both for insurance and for a repair shop's initial assessment. Take close-up shots of the damage details as well as wider shots showing the whole side of the car.",
        ],
      },
      {
        heading: "When a car should no longer be driven",
        paragraphs: [
          "Some damage is visible to the eye, but many dangerous issues do not show from the outside. If the steering feels harder to turn after a collision, the car pulls to one side while driving, you hear an unusual sound when braking, or a body or plastic part is loose and could come off while driving, the car should not be driven any further. In that case, it makes more sense to have the car transported to the workshop rather than drive it yourself.",
        ],
      },
      {
        heading: "Why some damage does not show from the outside",
        paragraphs: [
          "The force of a collision does not always stay contained to the visible impact point. It can damage the car's structure, alignment, or internal mountings, even if only a scratch or a small dent is visible from the outside. That is why, after a more serious collision, it makes sense to have the car inspected in person rather than assess the damage from photos alone.",
        ],
      },
      {
        heading: "When photos are enough and when an in-person inspection is needed",
        paragraphs: [
          "For minor cosmetic damage, such as scratches and small dents with no visible structural damage, good photos are usually enough for an initial estimate. For a more serious accident, suspected structural damage, or a car that cannot be driven, an in-person inspection is needed to give an accurate quote and identify the full extent of the damage.",
        ],
      },
      {
        heading: "Next step",
        paragraphs: [
          "Once you have documented the damage and decided whether the car can still be driven, you can contact a repair shop. Read more about how Mpaint handles post-accident bodywork and how to get the car to the workshop if it is not drivable.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I drive my car myself after an accident?",
        a: "Only if the car is definitely drivable: the steering, brakes, and lights work properly, and no body or plastic parts are loose. If in doubt, it is safer to have the car transported.",
      },
    ],
  },

  rustRepair: {
    title: "Can a rusted body part still be repaired?",
    description: "Surface rust and rusted-through metal need different solutions. Here is when a part can still be repaired and when it needs replacing.",
    excerpt: "Rust does not always mean a part has to be replaced. Here is what decides whether a repair still makes sense.",
    intro: [
      "How rust develops depends on how far the corrosion has reached into the metal. Surface rust is almost always repairable, but metal that has rusted through needs a different approach.",
    ],
    sections: [
      {
        heading: "Surface rust versus metal rusted through",
        paragraphs: [
          "Surface rust means corrosion has only reached the outer layer of the metal, without weakening its strength. It is removed, the metal is cleaned and treated with acid to remove invisible corrosion too, and then protected with multiple layers of primer before painting. Metal rusted through means the corrosion has eaten through the metal. In that case, simply cleaning and priming is no longer enough, because the metal itself has lost its strength.",
        ],
      },
      {
        heading: "When a repair makes sense",
        paragraphs: [
          "If rust is caught early and stays on the surface, a repair almost always makes sense and is significantly cheaper than replacing the part. The earlier rust is noticed, the smaller the area that needs repairing.",
        ],
      },
      {
        heading: "When to consider replacement instead",
        paragraphs: [
          "If corrosion has gone far enough that the metal has rusted through or lost its structural strength, we usually recommend replacing the part rather than repairing it: patching metal that has rusted through does not give a lasting result, and the rust usually comes back.",
        ],
      },
      {
        heading: "What causes rust in Estonian conditions",
        paragraphs: [
          "Estonia's winter road salt speeds up rust significantly, especially once the paint layer is already damaged by a scratch or stone chip that leaves the metal exposed to salt and moisture. That is why it is worth repairing small paint damage quickly, before it develops into rust.",
        ],
      },
      {
        heading: "How to prevent rust going forward",
        paragraphs: [
          "For newer cars, we also offer preventive rust protection, which is a sensible investment given Estonia's winter road conditions.",
        ],
      },
    ],
    faq: [
      { q: "How does rust damage repair work?", a: "We remove the damaged area, repair the metal where needed, and prepare the surface for repainting." },
      { q: "Can a rusted part always be repaired?", a: "Not always. A heavily damaged or fully rusted-through part may need a partial or full replacement." },
    ],
  },

  bumperRepair: {
    title: "Bumper repair or replacement: which makes more sense?",
    description: "A cracked or deformed bumper does not always need replacing. Here is what decides whether a repair or a replacement is the smarter choice.",
    excerpt: "Plastic bumper damage often looks worse than it actually is. Here is how to decide between repair and replacement.",
    intro: [
      "Most modern cars have plastic bumpers designed to absorb some of the impact energy. That means a minor collision often leaves visible damage without the bumper's structure actually being seriously affected.",
    ],
    sections: [
      {
        heading: "What kind of damage is usually repairable",
        paragraphs: [
          "Cracks, scratches, minor deformation, and smaller damage around the mounting points are usually repairable. The repair involves welding or bonding the plastic at the crack, levelling the surface, and then painting. Painting a plastic bumper needs slightly different prep than usual: the plastic surface needs an adhesion primer so the paint holds properly.",
        ],
      },
      {
        heading: "When replacement makes more sense",
        paragraphs: [
          "If the bumper is badly deformed, the mounting points are broken, or the damage is extensive enough that the repaired area would no longer be structurally reliable, replacement is the smarter choice. Likewise, if the cost of the repair work gets close to the price of a new or used bumper, a repair may no longer make financial sense.",
        ],
      },
      {
        heading: "What influences the decision",
        paragraphs: [
          "The decision depends on where and how extensive the damage is, the bumper's material, and whether the damage is purely cosmetic or also affects the mounting. If sensors behind the bumper, such as parking sensors or a camera, are also damaged, their condition needs to be assessed separately.",
        ],
      },
      {
        heading: "What to expect from a repair job",
        paragraphs: [
          "We first assess the extent of the damage and decide whether a repair makes sense. If it does, the paint is matched to the car's factory colour code and the bumper is painted in our own dust-free booth. Painting a single part, such as a bumper, starts from 250 euros.",
        ],
      },
    ],
    faq: [
      { q: "Can plastic bumpers be repaired and painted?", a: "Yes. Whether it's possible depends on the crack, deformation, and extent of the damage." },
      {
        q: "Will a repaired bumper look as good as a new one?",
        a: "A properly done repair and colour match gives a visually even result. For heavier deformation, replacement is worth considering.",
      },
    ],
  },

  paintingProcess: {
    title: "How does car painting work?",
    description: "Car painting step by step: prep, colour matching, painting in a dust-free booth, and finishing.",
    excerpt: "A good paint result depends heavily on preparation. Here is what actually happens during the painting process.",
    intro: [
      "A good paint result does not just come out of a spray gun. Most of the work and time actually goes into preparation and finishing, not applying the paint itself.",
    ],
    sections: [
      {
        heading: "1. Assessing the damage and prep",
        paragraphs: [
          "Before painting, the extent of the damage, the condition of the body part, and the existing paint are assessed. Rust is removed where needed, dents are repaired, and the surface is prepped with sanding, priming, and other groundwork.",
        ],
      },
      {
        heading: "2. Colour matching",
        paragraphs: [
          "The paint is chosen based on the car's factory colour code and the existing shade. Several quality paint brands are used, preferring an exact colour match from one specific manufacturer. For trickier cases, a spectrophotometer test spray is done before the full repaint to check the shade is accurate.",
        ],
      },
      {
        heading: "3. Metallic and pearl finishes",
        paragraphs: [
          "Metallic and pearl finishes need more work than a standard solid colour. Pearl needs two separate coats of paint to get the right depth and shine, which is also why it costs more.",
        ],
      },
      {
        heading: "4. Painting in a dust-free booth",
        paragraphs: [
          "Painting happens in a filtered, dust-free booth so the surface gets an even, smooth finish without airborne particles. This applies to both single-panel jobs and full-car resprays.",
        ],
      },
      {
        heading: "5. Blending with neighbouring panels",
        paragraphs: [
          "When only one panel is painted, the new paint needs to be blended into the faded neighbouring panels so the transition is smooth and not visible to the eye.",
        ],
      },
      {
        heading: "How long it takes",
        paragraphs: [
          "Painting a single panel takes 3-4 days on average, a full respray takes over a month. Most of that time goes into taking the car apart and putting it back together, not the paint drying.",
        ],
      },
    ],
    faq: [
      { q: "Do you paint whole cars too?", a: "Yes, we do everything from single parts to larger panels and full-car resprays." },
      { q: "What's done before painting?", a: "The surface is cleaned, sanded, repaired where needed, and primed according to its condition." },
    ],
  },
};
