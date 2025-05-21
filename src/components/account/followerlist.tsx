import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, User, ExternalLink, Shield } from 'lucide-react';
import { Follower, Connection } from '../../types';

interface FollowerListProps {
  followers: Follower[];
  connections: Connection[];
  onRemoveFollower: (id: number) => void;
  onRemoveConnection: (id: number) => void;
  onUpdateFollower: (id: number, field: string, value: any) => void;
  onUpdateConnection: (id: number, field: string, value: any) => void;
  onToggleFollowerLimits: (id: number, enabled: boolean) => void;
  onToggleConnectionLimits: (id: number, enabled: boolean) => void;
  onShowConnectionModal: () => void;
}

export const FollowerList: React.FC<FollowerListProps> = ({
  followers,
  connections,
  onRemoveFollower,
  onRemoveConnection,
  onUpdateFollower,
  onUpdateConnection,
  onToggleFollowerLimits,
  onToggleConnectionLimits,
  onShowConnectionModal
}) => {
  return (
    <div className="space-y-4">
      {/* Local Followers */}
      {followers.map((follower, index) => (
        <div key={follower.id} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Subconta {index + 1}</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemoveFollower(follower.id)}
              className="text-red-600"
            >
              Remover
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Conta</Label>
              <Input
                value={follower.account}
                disabled
                className="mt-1 bg-white"
              />
            </div>
            <div>
              <Label className="text-xs">Multiplicador</Label>
              <Input
                type="number"
                step="0.1"
                value={follower.multiplier}
                onChange={(e) => onUpdateFollower(follower.id, 'multiplier', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                checked={follower.active}
                onCheckedChange={(checked) => onUpdateFollower(follower.id, 'active', checked)}
              />
              <Label className="text-sm">Ativa</Label>
            </div>
            <Badge variant="secondary" className="text-xs">
              Subconta Local
            </Badge>
          </div>
          
          {/* Proteção de Limites para Subconta */}
          <div className="mt-3 flex items-center justify-between p-2 border border-indigo-200 rounded-lg bg-indigo-50">
            <div className="flex items-center">
              <span className="mr-2 p-1 bg-indigo-100 rounded-md">
                <Shield className="h-4 w-4 text-indigo-600" />
              </span>
              <span className="text-xs font-medium text-indigo-700">
                Limites Diários
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xs mr-2 text-indigo-700">
                {follower.limitsEnabled ? 'Ativado' : 'Desativado'}
              </span>
              <Switch 
                checked={follower.limitsEnabled} 
                onCheckedChange={(checked) => onToggleFollowerLimits(follower.id, checked)}
                size="sm"
              />
            </div>
          </div>
          
          {follower.limitsEnabled && (
            <div className="mt-2 p-3 border border-blue-200 rounded-lg bg-blue-50">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-blue-800">Limite de Perda</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-2 top-2 text-gray-500 text-xs">$</span>
                    <Input
                      type="number"
                      value={follower.dailyLossLimit}
                      onChange={(e) => onUpdateFollower(follower.id, 'dailyLossLimit', e.target.value)}
                      className="pl-6 text-sm py-1 h-8"
                      placeholder="500"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-blue-800">Meta de Ganho</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-2 top-2 text-gray-500 text-xs">$</span>
                    <Input
                      type="number"
                      value={follower.dailyProfitTarget}
                      onChange={(e) => onUpdateFollower(follower.id, 'dailyProfitTarget', e.target.value)}
                      className="pl-6 text-sm py-1 h-8"
                      placeholder="1000"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <Switch
                  checked={follower.enforceLimits}
                  onCheckedChange={(checked) => onUpdateFollower(follower.id, 'enforceLimits', checked)}
                  size="sm"
                />
                <Label className="ml-2 text-xs text-blue-800">
                  Aplicar automaticamente
                </Label>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* External Connections */}
      {connections.map((connection) => (
        <div key={connection.id} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4 text-purple-600" />
              <span className="font-medium">Login Externo: {connection.username}</span>
              {connection.copyMode === 'all' && (
                <Badge variant="default" className="text-xs">
                  Todas as Contas
                </Badge>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemoveConnection(connection.id)}
              className="text-red-600"
            >
              Remover
            </Button>
          </div>
          
          {/* Connection details and controls */}
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              {connection.copyMode === 'all' ? 'Copiando:' : 'Conta:'} {connection.accounts.map((acc, i) => (
                <Badge key={i} variant="outline" className="ml-1 text-xs">
                  {acc}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Multiplicador</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={connection.multiplier}
                  onChange={(e) => onUpdateConnection(connection.id, 'multiplier', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-2 mt-5">
                <Switch
                  checked={connection.active}
                  onCheckedChange={(checked) => onUpdateConnection(connection.id, 'active', checked)}
                />
                <Label className="text-sm">Ativo</Label>
              </div>
            </div>
          </div>
          
          {/* Limits controls */}
          <div className="mt-3 flex items-center justify-between p-2 border border-purple-200 rounded-lg bg-purple-50">
            <div className="flex items-center">
              <span className="mr-2 p-1 bg-purple-100 rounded-md">
                <Shield className="h-4 w-4 text-purple-600" />
              </span>
              <span className="text-xs font-medium text-purple-700">
                Limites Diários
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xs mr-2 text-purple-700">
                {connection.limitsEnabled ? 'Ativado' : 'Desativado'}
              </span>
              <Switch 
                checked={connection.limitsEnabled} 
                onCheckedChange={(checked) => onToggleConnectionLimits(connection.id, checked)}
                size="sm"
              />
            </div>
          </div>
          
          {connection.limitsEnabled && (
            <div className="mt-2 p-3 border border-purple-200 rounded-lg bg-purple-50">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-purple-800">Limite de Perda</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-2 top-2 text-gray-500 text-xs">$</span>
                    <Input
                      type="number"
                      value={connection.dailyLossLimit}
                      onChange={(e) => onUpdateConnection(connection.id, 'dailyLossLimit', e.target.value)}
                      className="pl-6 text-sm py-1 h-8 bg-white/80"
                      placeholder="500"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-purple-800">Meta de Ganho</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-2 top-2 text-gray-500 text-xs">$</span>
                    <Input
                      type="number"
                      value={connection.dailyProfitTarget}
                      onChange={(e) => onUpdateConnection(connection.id, 'dailyProfitTarget', e.target.value)}
                      className="pl-6 text-sm py-1 h-8 bg-white/80"
                      placeholder="1000"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <Switch
                  checked={connection.enforceLimits}
                  onCheckedChange={(checked) => onUpdateConnection(connection.id, 'enforceLimits', checked)}
                  size="sm"
                />
                <Label className="ml-2 text-xs text-purple-800">
                  Aplicar automaticamente
                </Label>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Add Account Button */}
      <Button 
        onClick={onShowConnectionModal}
        variant="outline"
        className="w-full bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100"
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Conta Seguidora
      </Button>
    </div>
  );
};