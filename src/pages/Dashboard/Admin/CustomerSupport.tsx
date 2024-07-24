import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { ticketsApi } from '../../../sevices/rtk-api/ticketsApi';
import { CustomerTickets } from '../../../types/types';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const CustomerSupportTickets: React.FC = () => {
  const { data: tickets = [], refetch, isLoading: isFetching, error } = ticketsApi.useGetTicketsQuery();
  const [deleteTicket, { isLoading: isDeleting }] = ticketsApi.useDeleteTicktetMutation();

  const handleDelete = async (ticket_id: number) => {
    try {
      await deleteTicket(ticket_id).unwrap();
      refetch();
      toast.success('Ticket deleted successfully');
    } catch (error: any) {
      console.error("Failed to delete ticket", error);
      toast.error("Failed to delete ticket");
    }
  };

  if (error) {
    return <Typography variant="h6" color="error">Failed to load tickets.</Typography>;
  }

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Customer Support Tickets</Typography>
      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h6" className="text-blue-800 mb-4">Tickets List</Typography>
          {isFetching ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader size={50} color="#123abc" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket: CustomerTickets) => (
                <Card key={ticket.ticket_id} className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <Typography variant="h6" className="text-blue-800">{ticket.subject}</Typography>
                    <Typography variant="body2" className="text-gray-700">{ticket.description}</Typography>
                    <Typography variant="body2" className="text-gray-700">{ticket.status}</Typography>
                    <div className="flex justify-between mt-4">
                      {/* <Button variant="contained" color="primary">
                        Respond
                      </Button> */}
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleDelete(ticket.ticket_id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? <ClipLoader size={20} color="#fff" /> : 'Delete'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerSupportTickets;
