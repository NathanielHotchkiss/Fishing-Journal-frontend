import { Fragment } from "react";
import { Tab } from "@headlessui/react";

const tabs = [
  {
    name: "Design",
    features: [
      {
        name: "TailwindCSS",
        description:
          "Using Tailwinds beautiful open source CSS framework, which is similiar to Bootstrap but does not provide a series of predefined classes for elements such as buttons or tables.",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-01.jpg",
        imageAlt:
          "Maple organizer base with slots, supporting white polycarbonate trays of various sizes.",
      },
    ],
  },
  {
    name: "Client-side",
    features: [
      {
        name: "React.js v17.x",
        description:
          "Reusable functional components linked together with react-router v6",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-02.jpg",
        imageAlt:
          "Walnut organizer base with pen, sticky note, phone, and bin trays, next to modular drink coaster attachment.",
      },
    ],
  },
  {
    name: "Server-side",
    features: [
      {
        name: "Express.js v4.18.x",
        description:
          "Our customers use Organize throughout the house to bring efficiency to many daily routines. Enjoy Organize in your workspace, kitchen, living room, entry way, garage, and more. We can't wait to see how you'll use it!",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-03.jpg",
        imageAlt:
          "Walnut organizer base with white polycarbonate trays in the kitchen with various kitchen utensils.",
      },
    ],
  },
  {
    name: "Database",
    features: [
      {
        name: "PostreSQL v14",
        description:
          "The Organize base set includes the pen, phone, small, and large trays to help you group all your essential items. Expand your set with the drink coaster and headphone stand add-ons.",
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-04.jpg",
        imageAlt:
          "Walnut organizer system on black leather desk mat on top of white desk.",
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="bg-white">
      <section
        aria-labelledby="features-heading"
        className="mx-auto max-w-7xl py-32 sm:px-2 lg:px-8"
      >
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <div className="max-w-3xl">
            <h2
              id="features-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Technical Specifications
            </h2>
            <p className="mt-4 text-gray-500">
              The Organize modular system offers endless options for arranging
              your favorite and most used items. Keep everything at reach and in
              its place, while dressing up your workspace.
            </p>
          </div>

          <Tab.Group as="div" className="mt-4">
            <div className="-mx-4 flex overflow-x-auto sm:mx-0">
              <div className="flex-auto border-b border-gray-200 px-4 sm:px-0">
                <Tab.List className="-mb-px flex space-x-10">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                          "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                        )
                      }
                    >
                      {tab.name}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
            </div>

            <Tab.Panels as={Fragment}>
              {tabs.map((tab) => (
                <Tab.Panel key={tab.name} className="space-y-16 pt-10 lg:pt-16">
                  {tab.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8"
                    >
                      <div className="mt-6 lg:col-span-5 lg:mt-0">
                        <h3 className="text-lg font-medium text-gray-900">
                          {feature.name}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                      <div className="lg:col-span-7">
                        <div className="aspect-w-2 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 sm:aspect-w-5 sm:aspect-h-2"></div>
                      </div>
                    </div>
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  );
}
