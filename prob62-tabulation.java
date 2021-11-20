class Solution {
    public int uniquePaths(int m, int n) {
        int[][]dp=new int[m][n];
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                dp[i][j]=-1;
            }
        }
        return sol(0,0,m-1,n-1,dp);
    }
    public int sol(int sr,int sc,int er,int ec,int[][]dp){
       
        for(int i=er;i>=sr;i--){
            for(int j=ec;j>=sc;j--){
                if(i==er && j==ec){
                    dp[i][j]=1;
                    continue;
                }
                int res=0;
                if(i+1<=er)
                res+=dp[i+1][j];
                if(j+1<=ec)
                res+=dp[i][j+1];
                dp[i][j]=res;
            }
        }
        return dp[0][0];
    }
}