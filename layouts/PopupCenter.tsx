import * as Dialog from '@radix-ui/react-dialog';
import { useRecoilState } from 'recoil';
import { popupState } from 'states';
import { cssvars } from 'utils';

export default function PopupCenter() {
  const [{ children, ...rest }, setPopup] = useRecoilState(popupState);

  return (
    <Dialog.Root open={!!children} onOpenChange={open => !open && setPopup({})}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/20" />
        <Dialog.Content style={cssvars({ t: '0.5s', y: '5rem' })} className="fixed inset-0 z-[200] bg-white fade-in">
          <div {...rest}>
            {children && (typeof children === 'function' ? children({ onClose: setPopup({}) }) : children)}
            <Dialog.Close>Close</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
