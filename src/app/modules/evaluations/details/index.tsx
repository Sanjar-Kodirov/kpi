import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Descriptions, Typography, Tag, Space, Divider, Image } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ContentUI } from "#ui/content";
import { ROUTES } from "#constants/index";

const { Title, Text } = Typography;

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
  photo_file_ids: string[];
}

export const EvaluationDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const evaluationData = location.state as EvaluationData;
  console.log("evaluationData", evaluationData);

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

          {/* {evaluationData.photo_file_ids && evaluationData.photo_file_ids.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <Divider orientation="left">Фотографии</Divider>
              <Space wrap>
                {evaluationData.photo_file_ids.map((photoId, index) => (
                  <Image
                    key={index}
                    width={200}
                    src={`/api/files/${photoId}`}
                    alt={`Приложение ${index + 1}`}
                    style={{ borderRadius: 4 }}
                  />
                ))}
              </Space>
            </div>
          )} */}
        </Card>
      </ContentUI.Middle>
    </ContentUI>
  );
};
