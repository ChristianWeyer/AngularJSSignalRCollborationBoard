using Microsoft.AspNet.SignalR;

namespace ngSignalRCollborationBoard
{
    public class CollabHub : Hub
    {
        public void CreateNote(dynamic note)
        {
            Clients.Others.onNoteCreated(note);
        }

        public void DeleteNote(dynamic note)
        {
            Clients.Others.onNoteDeleted(note);
        }

        public void UpdateNote(dynamic note)
        {
            Clients.Others.onNoteUpdated(note);
        }

        public void MoveNote(dynamic note)
        {
            Clients.Others.onNoteMoved(note);
        }
    }
}