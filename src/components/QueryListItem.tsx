import { Disclosure, Transition } from '@headlessui/react';
import { Image, ImageGroup } from 'react-fullscreen-image';
import { Link } from 'react-router-dom';

export default function QueryListItem({ title, id, imgUrl, domainId }: any) {
  return (
    <Disclosure>
      <Disclosure.Button className=" w-full pl-4 pr-4 text-left">
        <Link to={`/ke/${domainId}/dashboard/${id}`}>{title}</Link>
      </Disclosure.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel>
          {imgUrl && (
            <div>
              <ImageGroup>
                <Image src={imgUrl} alt={title} />
              </ImageGroup>

              {/* <img src={imgUrl} alt={title} /> */}
            </div>
          )}
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
}
