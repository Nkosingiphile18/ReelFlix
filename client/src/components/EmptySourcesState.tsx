import { Button, Card, CardBody } from "@heroui/react";

interface EmptySourcesStateProps {
  onOpenSettings: () => void;
}

export default function EmptySourcesState({ onOpenSettings }: EmptySourcesStateProps) {
  return (
    <div className="container mx-auto max-w-4xl px-6 pt-16">
      <Card className="w-full">
        <CardBody className="text-center py-16 px-8">
          <div className="mb-8">
            <div className="text-8xl mb-4">📺</div>
            <h1 className="text-3xl font-bold text-default-900 mb-4">欢迎使用 ReelFlix</h1>
            <p className="text-lg text-default-600 mb-2">
              您还没有配置任何视频源
            </p>
            <p className="text-default-500 max-w-md mx-auto">
              请添加至少一个视频源来开始浏览和观看内容。您可以在设置中添加和管理您的视频源。
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              color="primary" 
              size="lg" 
              onPress={onOpenSettings}
              className="font-semibold min-w-[200px]"
            >
              添加视频源
            </Button>
          </div>
          
          <div className="mt-12 p-6 bg-default-50 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-default-800">如何添加视频源？</h3>
            <div className="text-left text-default-600 space-y-2">
              <p>• 点击上方的"添加视频源"按钮</p>
              <p>• 输入视频源的名称和API地址</p>
              <p>• 确保API地址格式正确（如：https://api.example.com/provide/vod/）</p>
              <p>• 保存后即可开始浏览内容</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}