import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Descriptions, Tag, Space, Divider, Image, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { ContentUI } from "#ui/content";
import { ROUTES } from "#constants/index";
import { $downloadFile } from "#stores/common";
import { downloadBlobResponse } from "#utils/download";

interface EvaluationData {
  id: string;
  user_id: string;
  criteria_id: string;
  evaluation_text: string;
  status: string;
  evaluated_date: string;
  score: number;
  user_name: string;
  user_role: string;
  criteria_title: string;
  region_name: string;
  photo_file_ids?: string[];
  files: {
    id: string;
    file_type: string;
    name: string;
    size: number;
    mime_type: string;
    order_index: 0;
  }[];
}

export const EvaluationDetails: React.FC = () => {
  const location = useLocation();

  const evaluationData = location.state as EvaluationData;
  const downloadFileState = $downloadFile.store();

  const handleFileDownload = (fileId: string, fileName: string) => {
    $downloadFile.request(fileId);
  };

  useEffect(() => {
    if (downloadFileState.data) {
      downloadBlobResponse(
        {
          data: downloadFileState.data,
          headers: {},
        },
        `file_${Date.now()}`,
      );
      $downloadFile.reset();
    }
  }, [downloadFileState.data]);

  if (!evaluationData) {
    return (
      <ContentUI>
        <div>Информация об оценке не найдена</div>
      </ContentUI>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { color: "orange", text: "На рассмотрении" };
      case "approved":
        return { color: "green", text: "Одобрено" };
      case "rejected":
        return { color: "red", text: "Отклонено" };
      default:
        return { color: "default", text: status };
    }
  };

  console.log("evaluationData", evaluationData);

  const statusInfo = getStatusInfo(evaluationData.status);
  const formattedDate = new Date(evaluationData.evaluated_date).toLocaleDateString("ru-RU");

  return (
    <ContentUI>
      <ContentUI.Header backPath={ROUTES.EVALUATIONS} title="Оценка" />
      <ContentUI.Middle>
        <Card>
          <Descriptions
            column={1}
            bordered
            labelStyle={{
              width: "200px",
              fontWeight: "bold",
              backgroundColor: "#fafafa",
            }}
          >
            <Descriptions.Item label="ФИО">{evaluationData.user_name}</Descriptions.Item>
            <Descriptions.Item label="Должность">
              {evaluationData.user_role === "deputy_member" ? "Депутат" : "Модератор"}
            </Descriptions.Item>
            <Descriptions.Item label="Регион">{evaluationData.region_name}</Descriptions.Item>
            <Descriptions.Item label="Критерий">{evaluationData.criteria_title}</Descriptions.Item>
            <Descriptions.Item label="Дата оценки">{formattedDate}</Descriptions.Item>
            <Descriptions.Item label="Оценка">
              <Tag color="blue">{evaluationData.score} баллов</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Статус">
              <Tag color={statusInfo.color}>{statusInfo.text}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Комментарий">
              {evaluationData.evaluation_text || "Нет комментария"}
            </Descriptions.Item>
          </Descriptions>

          {evaluationData.photo_file_ids && evaluationData.photo_file_ids.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <Divider orientation="left">Фотографии</Divider>
              <Space wrap>
                {evaluationData.photo_file_ids.map((photoId, index) => (
                  <Image
                    key={index}
                    width={200}
                    style={{
                      borderRadius: 4,
                      height: "auto",
                      maxWidth: "100%",
                      aspectRatio: "1/1",
                    }}
                    src={`https://kpi-dep.qitmir.uz/api/photos/${photoId}`}
                    alt={`Приложение ${index + 1}`}
                  />
                ))}
              </Space>
            </div>
          )}

          {evaluationData.files && evaluationData.files.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <Divider orientation="left">Файлы</Divider>
              <Space direction="vertical" style={{ width: "100%" }}>
                {evaluationData.files.map((file, index) => (
                  <div
                    key={file.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onClick={() => handleFileDownload(file.id, file.name)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                      e.currentTarget.style.borderColor = "#1890ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "#d9d9d9";
                    }}
                  >
                    <DownloadOutlined style={{ marginRight: 8, color: "#1890ff" }} />
                    <Typography.Text strong style={{ flex: 1 }}>
                      {file.name}
                    </Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                      {file.file_type} • {(file.size / 1024).toFixed(1)} KB
                    </Typography.Text>
                  </div>
                ))}
              </Space>
            </div>
          )}
        </Card>
      </ContentUI.Middle>
    </ContentUI>
  );
};
