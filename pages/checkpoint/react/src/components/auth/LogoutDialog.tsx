import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface LogoutDialogProps {
  open: boolean
}

export const LogoutDialog = ({ open }: LogoutDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] gap-0 p-0 [&>button.absolute]:hidden overflow-hidden">
        <div className="flex flex-col">
          <DialogHeader className="text-center space-y-3 p-8 pb-6">
            <DialogTitle className="text-2xl font-semibold">
              Logging Out
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              You need to log back in.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full py-3 text-center text-base font-medium border-t border-gray-200 bg-gray-50">
            Log in
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
