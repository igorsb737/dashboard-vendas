import React, { useState, useCallback } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import YouTube from 'react-youtube';

const Dashboard = () => {
  const [salesData, setSalesData] = useState({
    savio1: 0,
    savio2: 0,
    paloma1: 0,
    paloma2: 0
  });
  const [videoInfo, setVideoInfo] = useState({ show: false, videoId: '' });

  // Função para atualizar os dados e mostrar o vídeo
  const updateSalesData = useCallback((data) => {
    setSalesData(prevData => ({
      ...prevData,
      [data.metric]: data.percentage
    }));

    const videoId = data.vendedor.toLowerCase() === 'savio' ? 'DkQnI5BT_8k' : 'rTga41r3a4s';
    setVideoInfo({ show: true, videoId });
  }, []);

  // Expor a função updateSalesData para testes manuais
  React.useEffect(() => {
    window.updateSalesData = updateSalesData;
  }, [updateSalesData]);

  const speedometerConfig = {
    width: 300,
    height: 200,
    needleHeightRatio: 0.7,
    maxValue: 100,
    customSegmentStops: [0, 80, 100],
    segmentColors: ['#3498db', '#2ecc71'],
    currentValueText: " ",
    textColor: '#333',
    ringWidth: 60,
    needleTransitionDuration: 3333,
    needleTransition: "easeElastic",
    needleColor: "#e74c3c",
    valueTextFontSize: '0px',
  };

  const SpeedometerWithLabel = ({ value, label }) => {
    return (
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '10px', 
        padding: '20px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ marginBottom: '10px', color: '#333' }}>{label}</h2>
        <ReactSpeedometer value={value} {...speedometerConfig} />
        <p style={{ marginTop: '10px', fontSize: '1.5em', fontWeight: 'bold' }}>
          {value.toFixed(2)}%
        </p>
      </div>
    );
  };

  const onVideoEnd = () => {
    setVideoInfo({ show: false, videoId: '' });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      padding: '20px',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '40px' }}>
        <SpeedometerWithLabel value={salesData.savio1} label="Savio" />
        <SpeedometerWithLabel value={salesData.paloma1} label="Paloma" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
        <SpeedometerWithLabel value={salesData.savio2} label="Savio" />
        <SpeedometerWithLabel value={salesData.paloma2} label="Paloma" />
      </div>
      {videoInfo.show && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          overflow: 'hidden',
          width: '640px',
          height: '360px'
        }}>
          <YouTube
            videoId={videoInfo.videoId}
            opts={{
              height: '360',
              width: '640',
              playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                rel: 0,
                showinfo: 0
              },
            }}
            onReady={(event) => {
              event.target.playVideo();
              event.target.unMute();
            }}
            onEnd={onVideoEnd}
          />
        </div>
      )}
      <style>
        {`
          .youtube-container iframe {
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;