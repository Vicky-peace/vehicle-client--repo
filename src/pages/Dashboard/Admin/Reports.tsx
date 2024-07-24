import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Divider, Avatar, Modal, Backdrop, Fade } from '@mui/material';
import { SaveAlt as SaveAltIcon, AccountBalanceWallet, Event, Group, Place, QuestionAnswer } from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ClipLoader} from 'react-spinners';
import { bookingsApi } from '../../../sevices/rtk-api/bookingApi';
import { paymentsApi } from '../../../sevices/rtk-api/paymentsApi';
import { usersApi } from '../../../sevices/rtk-api/userApi';
import { locationApi } from '../../../sevices/rtk-api/locationApi';
import { ticketsApi } from '../../../sevices/rtk-api/ticketsApi';

const Reports: React.FC = () => {
    const { data: payments = [] } = paymentsApi.useGetPaymentsQuery();
    const { data: bookings = [] } = bookingsApi.useGetBookingsQuery();
    const { data: users = [] } = usersApi.useGetUsersQuery();
    const { data: locations = [] } = locationApi.useGetLocationsQuery();
    const { data: tickets = [] } = ticketsApi.useGetTicketsQuery();
  
    const [selectedReport, setSelectedReport] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [reportTitle, setReportTitle] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleOpenModal = (data: any[], title: string) => {
      setSelectedReport(data);
      setReportTitle(title);
      setOpenModal(true);
    };
  
    const handleDownloadPDF = async () => {
      const input = document.getElementById('report-content');
      if (input) {
        setLoading(true);
        try {
          const canvas = await html2canvas(input, {
            useCORS: true,
            allowTaint: true,
            foreignObjectRendering: true,
            scale: 2,
          });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${reportTitle}.pdf`);
        } catch (error) {
          console.error('Failed to generate or download the PDF:', error);
        } finally {
          setLoading(false);
          setOpenModal(false); // Close the modal after download is complete
        }
      } else {
        console.error('Element with id "report-content" not found.');
      }
    };
  
    // Calculate total counts for each category
    const totalPayments = payments.length;
    const totalBookings = bookings.length;
    const totalUsers = users.length;
    const totalLocations = locations.length;
    const totalTickets = tickets.length;
  
    const statCards = [
      { title: 'Payments Report', count: totalPayments, icon: <AccountBalanceWallet fontSize="large" />, color: '#4caf50', data: payments },
      { title: 'Bookings Report', count: totalBookings, icon: <Event fontSize="large" />, color: '#2196f3', data: bookings },
      { title: 'Users Report', count: totalUsers, icon: <Group fontSize="large" />, color: '#9c27b0', data: users },
      { title: 'Locations Report', count: totalLocations, icon: <Place fontSize="large" />, color: '#ff9800', data: locations },
      { title: 'Customer Support Tickets Report', count: totalTickets, icon: <QuestionAnswer fontSize="large" />, color: '#f44336', data: tickets },
    ];
  
    return (
      <Box p={4}>
        <Typography variant="h2" gutterBottom>
          Reports
        </Typography>
        <Grid container spacing={4}>
          {statCards.map((card, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                onClick={() => handleOpenModal(card.data, card.title)}
                style={{
                  borderLeft: `6px solid ${card.color}`,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  marginBottom: '20px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <CardContent>
                  <Avatar style={{ backgroundColor: card.color, marginBottom: '16px', width: '64px', height: '64px' }}>
                    {card.icon}
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    {card.title} ({card.count})
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Modal
          open={openModal}
          onClose={() => !loading && setOpenModal(false)} // Prevent closing while loading
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Box
              component="div"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: '800px',
                backgroundColor: 'white',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                padding: '24px',
                borderRadius: '10px',
              }}
            >
              <Typography variant="h4" gutterBottom>
                {reportTitle}
              </Typography>
              <Box id="report-content" p={2} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {selectedReport.map((item: any, index: number) => (
                  <Box key={index} mb={2}>
                    <Typography variant="body1">
                      {Object.entries(item).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value as React.ReactNode}
                        </div>
                      ))}
                    </Typography>
                    {index !== selectedReport.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
              <Box mt={4} textAlign="right">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveAltIcon />}
                  onClick={handleDownloadPDF}
                  disabled={loading}
                >
                  {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Download PDF'}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    );
  };
  
  export default Reports;