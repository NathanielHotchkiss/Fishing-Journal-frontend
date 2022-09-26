import { CheckIcon } from "@heroicons/react/24/outline";

const features = [
  {
    name: "Accounts",
    description: "Create, edit, and delete a user account.",
  },
  {
    name: "Sign in & out",
    description: "Secure and easy process.",
  },
  {
    name: "Record logs",
    description: "Create, edit, and delete fishing data.",
  },
  {
    name: "JWT Web Token",
    description: "For user security.",
  },
  {
    name: "Protected routes",
    description: "To protect user information.",
  },
  {
    name: "Mobile first",
    description: "A responsive design no matter where you visit.",
  },
  {
    name: "Fishing stats",
    description: "(coming soon)",
  },
  {
    name: "Customize input options",
    description: "(coming soon",
  },
];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            App Features
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            This is an ongoing project with new features coming soon!
          </p>
        </div>
        <dl className="mt-12 space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <CheckIcon
                  className="absolute h-6 w-6 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
