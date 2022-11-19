export default function Banner() {
  return (
    <div className="bg-zinc-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:px-16 sm:text-center">
          <div className="font-medium text-white">
            <span>Try the demo! </span>
            <span>Username: </span>
            <p className="underline d-inline mr-1">demo@mail.com</p>
            <span>Password: </span>
            <p className="underline d-inline">P@ssword1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
